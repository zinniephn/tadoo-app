import { useEffect, useReducer } from 'react'
import { PERIODS, STARTER_TASKS } from './periods'
import { SHOP_ITEMS, isHelpingTask, isReadingTask, reachedBadges } from './rewards'

const STORAGE_KEY = 'tadoo:v1'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

// The "Y-M-D" key of the day before `day`.
function dayBefore(day) {
  const [y, m, d] = day.split('-').map(Number)
  const prev = new Date(y, m - 1, d - 1)
  return `${prev.getFullYear()}-${prev.getMonth() + 1}-${prev.getDate()}`
}

function makeId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function starterState() {
  const tasks = {}
  for (const { id } of PERIODS) {
    tasks[id] = STARTER_TASKS[id].map((text) => ({ id: makeId(), text, done: false }))
  }
  return { name: '', stars: 0, tasks, day: todayKey(), ...starterRewards(0) }
}

// owned: sticker ids bought in the Star Shop. badges: earned badge ids.
// stats.earned counts every star ever earned, so spending stars doesn't undo "Star collector".
function starterRewards(stars) {
  return { owned: [], badges: [], stats: { earned: stars, read: 0, help: 0, streak: 0, lastFullDay: null } }
}

// A new day starts with fresh checkboxes; the star total carries over.
function startNewDayIfNeeded(state) {
  const day = todayKey()
  if (state.day === day) return state
  const tasks = {}
  for (const { id } of PERIODS) {
    tasks[id] = (state.tasks[id] ?? []).map((t) => ({ ...t, done: false, locked: false }))
  }
  return { ...state, tasks, day }
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    // Saves from before the Star Shop existed get empty rewards.
    if (saved?.tasks) return withNewBadges(startNewDayIfNeeded({ ...starterRewards(saved.stars ?? 0), ...saved }))
  } catch {
    // Storage blocked or corrupt: fall through to a fresh start.
  }
  return starterState()
}

function reducer(state, action) {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name }
    case 'toggle': {
      const list = state.tasks[action.period]
      const task = list.find((t) => t.id === action.id)
      // A locked task's star was spent in the Star Shop, so it can't be unchecked and re-earned.
      if (!task || task.locked) return state
      const step = task.done ? -1 : 1
      const count = (n, matches) => (matches ? Math.max(0, n + step) : n)
      const next = {
        ...state,
        stars: Math.max(0, state.stars + step),
        tasks: {
          ...state.tasks,
          [action.period]: list.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)),
        },
        stats: {
          ...state.stats,
          earned: count(state.stats.earned, true),
          read: count(state.stats.read, isReadingTask(task.text)),
          help: count(state.stats.help, isHelpingTask(task.text)),
        },
      }
      // The first time every task is checked today, the day counts toward the streak.
      const allDone = PERIODS.every(({ id }) => next.tasks[id].every((t) => t.done))
      if (allDone && next.stats.lastFullDay !== state.day) {
        const streak = next.stats.lastFullDay === dayBefore(state.day) ? next.stats.streak + 1 : 1
        next.stats = { ...next.stats, streak, lastFullDay: state.day }
      }
      return withNewBadges(next)
    }
    case 'buy': {
      const item = SHOP_ITEMS.find((i) => i.id === action.id)
      if (!item || state.owned.includes(item.id) || state.stars < item.price) return state
      // Spending stars locks today's checked tasks until the next day.
      const tasks = {}
      for (const { id } of PERIODS) {
        tasks[id] = state.tasks[id].map((t) => (t.done ? { ...t, locked: true } : t))
      }
      return withNewBadges({ ...state, tasks, stars: state.stars - item.price, owned: [...state.owned, item.id] })
    }
    case 'add':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.period]: [...state.tasks[action.period], { id: makeId(), text: action.text, done: false }],
        },
      }
    case 'remove':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.period]: state.tasks[action.period].filter((t) => t.id !== action.id),
        },
      }
    case 'newDay':
      return startNewDayIfNeeded(state)
    default:
      return state
  }
}

function withNewBadges(state) {
  const fresh = reachedBadges(state).filter((id) => !state.badges.includes(id))
  return fresh.length ? { ...state, badges: [...state.badges, ...fresh] } : state
}

export function useTadoo() {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Private mode etc. — the app still works for this visit.
    }
  }, [state])

  // If the app stays open past midnight, reset checkboxes when it's looked at again.
  useEffect(() => {
    const check = () => dispatch({ type: 'newDay' })
    window.addEventListener('focus', check)
    document.addEventListener('visibilitychange', check)
    return () => {
      window.removeEventListener('focus', check)
      document.removeEventListener('visibilitychange', check)
    }
  }, [])

  return [state, dispatch]
}
