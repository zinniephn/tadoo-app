import { useCallback, useState } from 'react'
import { useTadoo } from './state/useTadoo'
import { PERIODS, periodForHour } from './state/periods'
import Header from './components/Header'
import TaskBoard from './components/TaskBoard'
import NameScreen from './components/NameScreen'
import CelebrationModal from './components/CelebrationModal'
import AccountDrawer from './components/AccountDrawer'
import StarBoard from './components/StarBoard'
import './App.css'

export default function App() {
  const [state, dispatch] = useTadoo()
  const [activePeriod, setActivePeriod] = useState(() => periodForHour(new Date().getHours()))
  const [editingName, setEditingName] = useState(false)
  const [celebration, setCelebration] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  // 'day' is the task list; 'shop', 'stickers' and 'badges' are the star screens.
  const [screen, setScreen] = useState('day')
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
    <div className="app">
      <Header
        name={state.name}
        stars={state.stars}
        day={state.day}
        onOpenMenu={() => setMenuOpen(true)}
        topOnly={screen !== 'day'}
      />
      <main>
        {screen === 'day' ? (
          <TaskBoard
            tasks={state.tasks}
            activePeriod={activePeriod}
            onSelectPeriod={setActivePeriod}
            onToggle={toggle}
            onRemove={(period, id) => dispatch({ type: 'remove', period, id })}
            onAdd={(period, text) => dispatch({ type: 'add', period, text })}
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
      {menuOpen && (
        <AccountDrawer
          name={state.name}
          stars={state.stars}
          onClose={closeMenu}
          onGo={(id) => {
            setMenuOpen(false)
            setScreen(id === 'tasks' ? 'day' : id)
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
