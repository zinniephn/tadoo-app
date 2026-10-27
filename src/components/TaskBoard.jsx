import { PERIODS } from '../state/periods'
import TaskRow from './TaskRow'
import AddTaskRow from './AddTaskRow'
import copyIcon from '../assets/copy.svg'
import './TaskBoard.css'

// Figma "Copy from today": opens the panel for copying today's tasks into tomorrow.
function CopyButton({ onClick }) {
  return (
    <button type="button" className="copy-button" onClick={onClick}>
      <img src={copyIcon} alt="" width="28" height="28" />
      Copy from today
    </button>
  )
}

// Morning / Afternoon / Evening tabs with the list for the chosen part of the day.
// future: the lists are tomorrow's plan (locked checkboxes, empty state, copy button).
export default function TaskBoard({ tasks, activePeriod, future = false, onSelectPeriod, onToggle, onRemove, onAdd, onCopy }) {
  const period = PERIODS.find((p) => p.id === activePeriod)
  const list = tasks[activePeriod]

  function handleTabKeys(e) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    const index = PERIODS.findIndex((p) => p.id === activePeriod)
    const next = PERIODS[(index + step + PERIODS.length) % PERIODS.length]
    onSelectPeriod(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <section className="board" aria-label="My Tasks">
      <div className="board__tabs" role="tablist" aria-label="Part of the day" onKeyDown={handleTabKeys}>
        {PERIODS.map((p) => {
          const selected = p.id === activePeriod
          const all = tasks[p.id]
          const allDone = all.length > 0 && all.every((t) => t.done)
          return (
            <button
              key={p.id}
              id={`tab-${p.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="task-panel"
              tabIndex={selected ? 0 : -1}
              className={`board__tab ${selected ? 'board__tab--active' : ''}`}
              style={{ '--tab-color': p.color }}
              onClick={() => onSelectPeriod(p.id)}
            >
              <img src={p.icon} alt="" width="36" height="36" />
              <span className="board__tab-label">{p.label}</span>
              {allDone && <span className="visually-hidden">, all done</span>}
            </button>
          )
        })}
      </div>

      <div
        id="task-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activePeriod}`}
        className="board__panel"
        style={{ '--panel-color': period.color, '--divider': period.divider }}
      >
        <ul className="board__list">
          {future && list.length === 0 && (
            <li className="board__empty">
              <p className="board__empty-title">Nothing planned for tomorrow {period.label.toLowerCase()} yet</p>
              <p className="board__empty-text">
                Copy tasks from today or add new ones.
                <br />
                If you don’t plan anything, tomorrow repeats today’s tasks.
              </p>
              <CopyButton onClick={() => onCopy(activePeriod)} />
            </li>
          )}
          {list.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              future={future}
              onToggle={() => onToggle(activePeriod, task.id)}
              onRemove={() => onRemove(activePeriod, task.id)}
            />
          ))}
          <AddTaskRow
            key={`${future}-${activePeriod}`}
            periodLabel={period.label}
            onAdd={(text) => onAdd(activePeriod, text)}
            aside={future && list.length > 0 && <CopyButton onClick={() => onCopy(activePeriod)} />}
          />
        </ul>
      </div>
    </section>
  )
}
