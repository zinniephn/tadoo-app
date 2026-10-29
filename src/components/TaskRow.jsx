import checkedIcon from '../assets/checked.svg'
import minusIcon from '../assets/minus.svg'
import starIcon from '../assets/star.svg'
import padlockIcon from '../assets/padlock.svg'

// future: the task is on tomorrow's list, so its checkbox stays locked until that day.
export default function TaskRow({ task, future = false, onToggle, onRemove }) {
  const locked = task.locked || future
  return (
    <li className="flex items-center justify-between gap-4 px-[22px] border-b border-(--divider) max-[700px]:px-3.5">
      <button
        type="button"
        className={`group flex-1 min-w-0 min-h-14 flex items-center gap-4 text-left font-heading text-task leading-[1.2] ${locked ? 'cursor-default' : ''}`}
        onClick={locked ? undefined : onToggle}
        aria-pressed={task.done}
        aria-disabled={locked || undefined}
        title={
          future ? 'You can check this tomorrow' : task.locked ? 'You used this star in the Star Shop' : undefined
        }
      >
        {task.done ? (
          <img className="shrink-0 m-px animate-pop-in" src={checkedIcon} alt="" width="34" height="34" />
        ) : future ? (
          // Figma "Checkbox/Locked"
          <span
            className="shrink-0 size-9 rounded-md grid place-items-center border-2 border-dashed border-[#d9d6cc] bg-[#f1f0ea]"
            aria-hidden="true"
          >
            <img src={padlockIcon} alt="" width="18" height="20" />
          </span>
        ) : (
          <span
            className={`shrink-0 size-9 rounded-md bg-checkbox-bg transition ${locked ? '' : 'group-hover:shadow-[inset_0_0_0_3px_var(--divider)] group-active:scale-90'}`}
            aria-hidden="true"
          />
        )}
        <span className="wrap-anywhere">{task.text}</span>
        <span className="sr-only">
          {task.done ? ', done!' : ''}
          {task.locked ? ' Star used in the Star Shop.' : ''}
          {future ? ', can be checked tomorrow' : ''}
        </span>
      </button>

      {task.done ? (
        <img className="shrink-0 animate-star-pop" src={starIcon} alt="" width="36" height="36" />
      ) : (
        <button
          type="button"
          className="shrink-0 grid place-items-center size-14 -mr-2.5 rounded-full transition-transform hover:scale-110"
          onClick={onRemove}
          aria-label={`Remove ${task.text}`}
        >
          <img src={minusIcon} alt="" width="36" height="36" />
        </button>
      )}
    </li>
  )
}
