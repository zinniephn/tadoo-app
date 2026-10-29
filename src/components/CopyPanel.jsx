import { useEffect, useRef } from 'react'
import closeIcon from '../assets/icon-close.svg'
import addedCheck from '../assets/added-check.svg'
import { Backdrop, ModalButton } from './ui'

// Figma "Copy from today panel": today's tasks for one part of the day, each copyable into tomorrow.
// A task counts as added when tomorrow already has a task with the same text.
export default function CopyPanel({ periodLabel, todayTasks, tomorrowTasks, onCopy, onClose }) {
  const closeButton = useRef(null)
  const planned = new Set(tomorrowTasks.map((t) => t.text.toLowerCase()))
  const notAdded = todayTasks.filter((t) => !planned.has(t.text.toLowerCase()))

  useEffect(() => {
    closeButton.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <Backdrop onClick={onClose}>
      <div
        className="flex flex-col gap-4 w-[min(640px,100%)] max-h-full overflow-y-auto py-9 px-[clamp(20px,5vw,40px)] rounded-[40px] bg-white shadow-[10px_10px_4px_0_rgb(188_184_184/0.25)] animate-panel-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="copy-panel-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="copy-panel-title" className="font-heading font-medium text-[length:clamp(28px,2vw_+_16px,36px)]">
            Copy from today
          </h2>
          <button
            ref={closeButton}
            type="button"
            className="shrink-0 grid place-items-center size-14 border border-line rounded-[28px] bg-white transition-transform hover:scale-105"
            onClick={onClose}
            aria-label="Close"
          >
            <img src={closeIcon} alt="" width="28" height="28" />
          </button>
        </div>
        <p className="font-body font-semibold text-hint text-muted">
          {todayTasks.length
            ? `Pick the ${periodLabel.toLowerCase()} tasks you want tomorrow too.`
            : `There are no ${periodLabel.toLowerCase()} tasks today.`}
        </p>

        <ul>
          {todayTasks.map((task) => (
            // Figma "Copy row"
            <li
              key={task.id}
              className="flex items-center justify-between gap-4 min-h-15 py-2.5 border-b border-[#ececec]"
            >
              <span className="min-w-0 wrap-anywhere font-heading text-date">{task.text}</span>
              {planned.has(task.text.toLowerCase()) ? (
                <span className="shrink-0 flex items-center gap-2 py-2 pr-1 font-heading font-medium text-[24px] text-celebrate-green max-[480px]:text-[20px]">
                  <img src={addedCheck} alt="" width="30" height="30" />
                  Added
                </span>
              ) : (
                <button
                  type="button"
                  className="shrink-0 py-2 px-5 rounded-3xl bg-add-blue text-white font-heading font-semibold text-[24px] whitespace-nowrap transition-transform hover:scale-105 max-[480px]:text-[20px]"
                  onClick={() => onCopy([task.id])}
                >
                  + Copy<span className="sr-only"> {task.text}</span>
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <ModalButton
            disabled={notAdded.length === 0}
            onClick={() => {
              onCopy(notAdded.map((t) => t.id))
              onClose()
            }}
          >
            Copy all
          </ModalButton>
          <ModalButton variant="no" onClick={onClose}>
            Done
          </ModalButton>
        </div>
      </div>
    </Backdrop>
  )
}
