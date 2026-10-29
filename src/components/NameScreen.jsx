import { useState } from 'react'
import Logo from './Logo'
import starIcon from '../assets/star.svg'

// First visit: ask the child's name. Also used to change it from the name badge.
export default function NameScreen({ initialName = '', onSave, onCancel }) {
  const [name, setName] = useState(initialName)
  const trimmed = name.trim()

  function submit(e) {
    e.preventDefault()
    if (trimmed) onSave(trimmed)
  }

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-10 p-gutter text-center">
      <Logo size="clamp(56px, 8vw + 24px, 96px)" />
      <form className="w-[min(480px,100%)] flex flex-col items-stretch gap-5" onSubmit={submit}>
        <label className="font-heading text-[length:clamp(28px,3vw_+_12px,40px)]" htmlFor="child-name">
          What’s your name?
        </label>
        <input
          id="child-name"
          className="h-18 px-6 border-3 border-[#fbe8c6] rounded-3xl bg-[#fff4e0] text-center font-heading text-[32px] focus:outline-none focus:border-brand-green"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          autoComplete="given-name"
          autoFocus
        />
        <button type="submit" className="h-18 flex items-center justify-center gap-3 rounded-[36px] bg-account-red text-white font-heading font-semibold text-[32px] transition-transform enabled:hover:scale-103 disabled:opacity-45" disabled={!trimmed}>
          Let’s go!
          <img src={starIcon} alt="" width="36" height="36" />
        </button>
        {onCancel && (
          <button type="button" className="h-14 font-heading text-[24px] underline" onClick={onCancel}>
            Back
          </button>
        )}
      </form>
    </main>
  )
}
