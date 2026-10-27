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
      <li className="add-row add-row--closed">
        <button type="button" className="add-row__open" onClick={() => setEditing(true)}>
          <img src={plusIcon} alt="" width="36" height="36" />
          <span>Add task</span>
          <span className="add-row__clipboard" aria-hidden="true">
            <img src={clipboardIcon} alt="" width="22.5" height="31.5" />
          </span>
        </button>
        {aside}
      </li>
    )
  }

  return (
    <li className="add-row add-row--editing">
      <form className="add-row__form" onSubmit={submit}>
        <label className="visually-hidden" htmlFor="new-task">
          New {periodLabel.toLowerCase()} task
        </label>
        <input
          id="new-task"
          className="add-row__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && close()}
          placeholder="What do you need to do?"
          maxLength={40}
          autoComplete="off"
          autoFocus
        />
        <button type="submit" className="add-row__submit" disabled={!text.trim()}>
          <img src={plusIcon} alt="" width="36" height="36" />
          Add
        </button>
        <button type="button" className="add-row__cancel" onClick={close} aria-label="Stop adding tasks">
          ✕
        </button>
      </form>
    </li>
  )
}
