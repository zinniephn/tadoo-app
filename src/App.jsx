import { useCallback, useState } from 'react'
import { tomorrowLists, useTadoo } from './state/useTadoo'
import { PERIODS, periodForHour } from './state/periods'
import Header from './components/Header'
import TaskBoard from './components/TaskBoard'
import NameScreen from './components/NameScreen'
import CelebrationModal from './components/CelebrationModal'
import AccountDrawer from './components/AccountDrawer'
import StarBoard from './components/StarBoard'
import CopyPanel from './components/CopyPanel'

export default function App() {
  const [state, dispatch] = useTadoo()
  const [activePeriod, setActivePeriod] = useState(() => periodForHour(new Date().getHours()))
  const [editingName, setEditingName] = useState(false)
  const [celebration, setCelebration] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  // 'day' is the task list; 'shop', 'stickers' and 'badges' are the star screens.
  const [screen, setScreen] = useState('day')
  // On My Day: 'today', or 'tomorrow' while planning ahead.
  const [viewDay, setViewDay] = useState('today')
  // The part of the day whose tasks are being copied into tomorrow (or null).
  const [copying, setCopying] = useState(null)
  const closeCopy = useCallback(() => setCopying(null), [])
  const closeCelebration = useCallback(() => setCelebration(null), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  if (!state.name || editingName) {
    return (
      <NameScreen
        initialName={state.name}
        onSave={(name) => {
          dispatch({ type: 'setName', name })
          setEditingName(false)
        }}
        onCancel={state.name ? () => setEditingName(false) : undefined}
      />
    )
  }

  function toggle(period, id) {
    const list = state.tasks[period]
    const task = list.find((t) => t.id === id)
    const finishesPeriod = !task.done && list.every((t) => t.id === id || t.done)
    dispatch({ type: 'toggle', period, id })
    if (!finishesPeriod) return

    const othersDone = PERIODS.every((p) => p.id === period || state.tasks[p.id].every((t) => t.done))
    setCelebration({
      periodLabel: PERIODS.find((p) => p.id === period).label,
      wholeDay: othersDone,
      starsEarned: othersDone ? PERIODS.reduce((sum, p) => sum + state.tasks[p.id].length, 0) : list.length,
    })
  }

  return (
    <div className="mx-auto max-w-[calc(1170px_+_2_*_var(--spacing-gutter))] pt-[45px] px-gutter pb-16 max-[600px]:pt-6">
      <Header
        name={state.name}
        stars={state.stars}
        day={state.day}
        onOpenMenu={() => setMenuOpen(true)}
        topOnly={screen !== 'day'}
        viewDay={viewDay}
        onSwitchDay={() => setViewDay(viewDay === 'today' ? 'tomorrow' : 'today')}
      />
      <main>
        {screen === 'day' ? (
          <TaskBoard
            tasks={viewDay === 'tomorrow' ? tomorrowLists(state) : state.tasks}
            future={viewDay === 'tomorrow'}
            activePeriod={activePeriod}
            onSelectPeriod={setActivePeriod}
            onToggle={toggle}
            onRemove={(period, id) => dispatch({ type: 'remove', when: viewDay, period, id })}
            onAdd={(period, text) => dispatch({ type: 'add', when: viewDay, period, text })}
            onCopy={setCopying}
          />
        ) : (
          <StarBoard
            screen={screen}
            state={state}
            onSelect={setScreen}
            onBack={() => setScreen('day')}
            onBuy={(id) => dispatch({ type: 'buy', id })}
          />
        )}
      </main>
      {copying && (
        <CopyPanel
          periodLabel={PERIODS.find((p) => p.id === copying).label}
          todayTasks={state.tasks[copying]}
          tomorrowTasks={tomorrowLists(state)[copying]}
          onCopy={(ids) => dispatch({ type: 'copyToTomorrow', period: copying, ids })}
          onClose={closeCopy}
        />
      )}
      {menuOpen && (
        <AccountDrawer
          name={state.name}
          stars={state.stars}
          onClose={closeMenu}
          onGo={(id) => {
            setMenuOpen(false)
            setScreen(id === 'tasks' ? 'day' : id)
            if (id === 'tasks') setViewDay('today')
          }}
          onEditName={() => {
            setMenuOpen(false)
            setEditingName(true)
          }}
        />
      )}
      {celebration && (
        <CelebrationModal
          name={state.name}
          {...celebration}
          onClose={closeCelebration}
          onShop={() => {
            setCelebration(null)
            setScreen('shop')
          }}
        />
      )}
    </div>
  )
}
