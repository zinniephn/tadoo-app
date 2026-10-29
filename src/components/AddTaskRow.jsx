import { useState } from 'react'
import plusIcon from '../assets/plus.svg'
import clipboardIcon from '../assets/clipboard.svg'

// aside: optional content shown at the end of the row (e.g. the Copy from today button).
export default function AddTaskRow({ periodLabel, onAdd, aside }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState('')

  function close() {
    setEditing(false)
    setText('')
  }

  function submit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  if (!editing) {
    return (
      <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-[22px] max-[700px]:px-3.5">
        <button
          type="button"
          className="min-h-14 flex items-center gap-4 font-heading text-task transition-transform hover:translate-x-1"
          onClick={() => setEditing(true)}
        >
          <img src={plusIcon} alt="" width="36" height="36" />
          <span>Add task</span>
          <span className="grid place-items-center size-9" aria-hidden="true">
            <img src={clipboardIcon} alt="" width="22.5" height="31.5" />
          </span>
        </button>
        {aside}
      </li>
    )
  }

  return (
    <li className="px-[22px] max-[700px]:px-3.5">
      <form className="flex items-center gap-3 flex-wrap" onSubmit={submit}>
        <label className="sr-only" htmlFor="new-task">
          New {periodLabel.toLowerCase()} task
        </label>
        <input
          id="new-task"
          className="flex-[1_1_260px] min-w-0 h-16 px-5 border-3 border-(--divider) rounded-[20px] bg-checkbox-bg font-heading text-task focus:outline-none focus:border-add-blue"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && close()}
          placeholder="What do you need to do?"
          maxLength={40}
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          className="h-16 flex items-center gap-2.5 pr-6 pl-3.5 rounded-[32px] bg-add-blue text-white font-heading font-semibold text-task disabled:opacity-45"
          disabled={!text.trim()}
        >
          {/* white circle behind the plus so it reads on the blue button */}
          <img className="rounded-full bg-white" src={plusIcon} alt="" width="36" height="36" />
          Add
        </button>
        <button
          type="button"
          className="size-14 rounded-full text-[28px] text-[#555] hover:bg-black/5"
          onClick={close}
          aria-label="Stop adding tasks"
        >
          ✕
        </button>
      </form>
    </li>
  )
}
