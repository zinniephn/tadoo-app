import checkedIcon from '../assets/checked.svg'
import minusIcon from '../assets/minus.svg'
import starIcon from '../assets/star.svg'

export default function TaskRow({ task, onToggle, onRemove }) {
  return (
    <li className={`task-row ${task.done ? 'task-row--done' : ''} ${task.locked ? 'task-row--locked' : ''}`}>
      <button
        type="button"
        className="task-row__toggle"
        onClick={task.locked ? undefined : onToggle}
        aria-pressed={task.done}
        aria-disabled={task.locked || undefined}
        title={task.locked ? 'You used this star in the Star Shop' : undefined}
      >
        {task.done ? (
          <img className="task-row__checked" src={checkedIcon} alt="" width="34" height="34" />
        ) : (
          <span className="task-row__box" aria-hidden="true" />
        )}
        <span className="task-row__text">{task.text}</span>
        <span className="visually-hidden">
          {task.done ? ', done!' : ''}
          {task.locked ? ' Star used in the Star Shop.' : ''}
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
