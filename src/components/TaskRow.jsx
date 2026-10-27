import checkedIcon from '../assets/checked.svg'
import minusIcon from '../assets/minus.svg'
import starIcon from '../assets/star.svg'
import padlockIcon from '../assets/padlock.svg'

// future: the task is on tomorrow's list, so its checkbox stays locked until that day.
export default function TaskRow({ task, future = false, onToggle, onRemove }) {
  const locked = task.locked || future
  return (
    <li className={`task-row ${task.done ? 'task-row--done' : ''} ${locked ? 'task-row--locked' : ''}`}>
      <button
        type="button"
        className="task-row__toggle"
        onClick={locked ? undefined : onToggle}
        aria-pressed={task.done}
        aria-disabled={locked || undefined}
        title={
          future ? 'You can check this tomorrow' : task.locked ? 'You used this star in the Star Shop' : undefined
        }
      >
        {task.done ? (
          <img className="task-row__checked" src={checkedIcon} alt="" width="34" height="34" />
        ) : future ? (
          // Figma "Checkbox/Locked"
          <span className="task-row__box task-row__box--future" aria-hidden="true">
            <img src={padlockIcon} alt="" width="18" height="20" />
          </span>
        ) : (
          <span className="task-row__box" aria-hidden="true" />
        )}
        <span className="task-row__text">{task.text}</span>
        <span className="visually-hidden">
          {task.done ? ', done!' : ''}
          {task.locked ? ' Star used in the Star Shop.' : ''}
          {future ? ', can be checked tomorrow' : ''}
        </span>
      </button>

      {task.done ? (
        <img className="task-row__star" src={starIcon} alt="" width="36" height="36" />
      ) : (
        <button type="button" className="task-row__remove" onClick={onRemove} aria-label={`Remove ${task.text}`}>
          <img src={minusIcon} alt="" width="36" height="36" />
        </button>
      )}
    </li>
  )
}
