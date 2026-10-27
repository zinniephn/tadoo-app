import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import Logo from './Logo'
import partyIcon from '../assets/modal-party.svg'
import greatJobStar from '../assets/modal-star.svg'
import wellDoneStar from '../assets/modal-star-2.svg'
import dayStar from '../assets/modal-star-day.svg'
import './CelebrationModal.css'

// The section variants of the Figma "Modal-tadoo" component, each with its own star size.
const CHEERS = [
  { text: 'Great job', star: greatJobStar, width: 34, height: 32 },
  { text: 'Well done', star: wellDoneStar, width: 36, height: 34 },
]

// wholeDay: every task of the day is checked (Figma "Variant4"), otherwise one part of the day.
// Closes on a tap outside the card or Escape; the whole-day pop-up also offers the Star Shop.
export default function CelebrationModal({ name, periodLabel, starsEarned, wholeDay, onClose, onShop }) {
  const focusTarget = useRef(null)
  const [cheer] = useState(() => CHEERS[Math.floor(Math.random() * CHEERS.length)])

  useEffect(() => {
    focusTarget.current?.focus()
    const burst = (x) =>
      confetti({
        particleCount: 90,
        spread: 75,
        startVelocity: 45,
        origin: { x, y: 0.6 },
        colors: ['#2caf00', '#ffcf48', '#ff5151', '#371dff', '#7fd4ff'],
        disableForReducedMotion: true,
        zIndex: 1001,
      })
    burst(0.25)
    burst(0.75)
    const later = setTimeout(() => burst(0.5), 300)

    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(later)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const stars = starsEarned === 1 ? 'star' : 'stars'

  return (
    <div className="celebration" onClick={onClose}>
      <div
        className={`celebration__card ${wholeDay ? 'celebration__card--day' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="celebration__logo-row">
          <Logo as="p" size={40} color="var(--celebrate-green)" variant="small" />
          <img src={partyIcon} alt="" width="31.5" height="30.4" />
        </div>

        {wholeDay ? (
          <>
            <p id="celebration-title" className="celebration__message">
              You did it {name}! You have checked out all the tasks today and earned {starsEarned} {stars}
              <img className="celebration__star" src={dayStar} alt="" width="36" height="33" />! Do you want
              to get a sticker from the star shop?
            </p>
            <button ref={focusTarget} type="button" className="celebration__shop" onClick={onShop}>
              To star shop
            </button>
          </>
        ) : (
          <p id="celebration-title" className="celebration__message">
            {cheer.text} {name}! All {periodLabel.toLowerCase()} tasks are checked!!!
            <br />
            You’ve earned {starsEarned} {stars}
            <img className="celebration__star" src={cheer.star} alt="" width={cheer.width} height={cheer.height} />
          </p>
        )}

        {/* The design has no close button; this gives keyboard and screen reader users one. */}
        <button
          ref={wholeDay ? undefined : focusTarget}
          type="button"
          className="celebration__close visually-hidden"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
