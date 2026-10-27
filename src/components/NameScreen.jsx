import { useState } from 'react'
import Logo from './Logo'
import starIcon from '../assets/star.svg'
import './NameScreen.css'

// First visit: ask the child's name. Also used to change it from the name badge.
export default function NameScreen({ initialName = '', onSave, onCancel }) {
  const [name, setName] = useState(initialName)
  const trimmed = name.trim()

  function submit(e) {
    e.preventDefault()
    if (trimmed) onSave(trimmed)
  }

  return (
    <main className="name-screen">
      <Logo size="clamp(56px, 8vw + 24px, 96px)" />
      <form className="name-screen__form" onSubmit={submit}>
        <label className="name-screen__label" htmlFor="child-name">
          What’s your name?
        </label>
        <input
          id="child-name"
          className="name-screen__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          autoComplete="given-name"
          autoFocus
        />
        <button type="submit" className="name-screen__go" disabled={!trimmed}>
          Let’s go!
          <img src={starIcon} alt="" width="36" height="36" />
        </button>
        {onCancel && (
          <button type="button" className="name-screen__back" onClick={onCancel}>
            Back
          </button>
        )}
      </form>
    </main>
  )
}
