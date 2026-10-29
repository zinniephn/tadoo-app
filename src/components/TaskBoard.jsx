import { PERIODS } from '../state/periods'
import TaskRow from './TaskRow'
import AddTaskRow from './AddTaskRow'
import copyIcon from '../assets/copy.svg'
import { BoardTab, BoardTabs } from './ui'

// Figma "Copy from today": opens the panel for copying today's tasks into tomorrow.
function CopyButton({ onClick }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2.5 py-2 pr-[22px] pl-4 border-2 border-add-blue rounded-[28px] bg-white text-add-blue font-heading font-medium text-[length:clamp(20px,1vw_+_14px,26px)] whitespace-nowrap transition-transform hover:scale-104"
      onClick={onClick}
    >
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
    <section className="mt-[30px]" aria-label="My Tasks">
      <BoardTabs aria-label="Part of the day" onKeyDown={handleTabKeys}>
        {PERIODS.map((p) => {
          const all = tasks[p.id]
          const allDone = all.length > 0 && all.every((t) => t.done)
          return (
            <BoardTab
              key={p.id}
              id={`tab-${p.id}`}
              aria-controls="task-panel"
              selected={p.id === activePeriod}
              color={p.color}
              icon={p.icon}
              label={p.label}
              onClick={() => onSelectPeriod(p.id)}
            >
              {allDone && <span className="sr-only">, all done</span>}
            </BoardTab>
          )
        })}
      </BoardTabs>

      <div
        id="task-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activePeriod}`}
        className="bg-(--panel-color) py-5"
        style={{ '--panel-color': period.color, '--divider': period.divider }}
      >
        <ul className="flex flex-col gap-5 max-[700px]:gap-2">
          {future && list.length === 0 && (
            <li className="flex flex-col items-center gap-6 pt-10 px-[22px] pb-8 text-center">
              <p className="font-heading font-medium text-task">Nothing planned for tomorrow {period.label.toLowerCase()} yet</p>
              <p className="font-body font-semibold text-hint text-muted">
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
