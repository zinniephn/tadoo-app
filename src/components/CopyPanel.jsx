import { useEffect, useRef } from 'react'
import closeIcon from '../assets/icon-close.svg'
import addedCheck from '../assets/added-check.svg'
import './CelebrationModal.css'
import './ConfirmBuy.css'
import './CopyPanel.css'

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
    <div className="celebration" onClick={onClose}>
      <div
        className="copy-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="copy-panel-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="copy-panel__top">
          <h2 id="copy-panel-title" className="copy-panel__title">
            Copy from today
          </h2>
          <button ref={closeButton} type="button" className="copy-panel__close" onClick={onClose} aria-label="Close">
            <img src={closeIcon} alt="" width="28" height="28" />
          </button>
        </div>
        <p className="copy-panel__hint">
          {todayTasks.length
            ? `Pick the ${periodLabel.toLowerCase()} tasks you want tomorrow too.`
            : `There are no ${periodLabel.toLowerCase()} tasks today.`}
        </p>

        <ul className="copy-panel__list">
          {todayTasks.map((task) => (
            <li key={task.id} className="copy-row">
              <span className="copy-row__task">{task.text}</span>
              {planned.has(task.text.toLowerCase()) ? (
                <span className="copy-row__added">
                  <img src={addedCheck} alt="" width="30" height="30" />
                  Added
                </span>
              ) : (
                <button type="button" className="copy-row__copy" onClick={() => onCopy([task.id])}>
                  + Copy<span className="visually-hidden"> {task.text}</span>
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="copy-panel__buttons">
          <button
            type="button"
            className="confirm-buy__yes"
            disabled={notAdded.length === 0}
            onClick={() => {
              onCopy(notAdded.map((t) => t.id))
              onClose()
            }}
          >
            Copy all
          </button>
          <button type="button" className="confirm-buy__no" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
