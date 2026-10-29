import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import Logo from './Logo'
import partyIcon from '../assets/modal-party.svg'
import greatJobStar from '../assets/modal-star.svg'
import wellDoneStar from '../assets/modal-star-2.svg'
import dayStar from '../assets/modal-star-day.svg'
import { Backdrop } from './ui'

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
    <Backdrop onClick={onClose}>
      <div
        className={`flex flex-col items-center gap-5 rounded-[49px] bg-celebrate-bg shadow-[10px_10px_4px_0_rgb(188_184_184/0.25)] text-celebrate-green font-heading animate-card-in ${wholeDay ? 'w-[min(556px,100%)] py-9 px-[clamp(24px,6vw,48px)]' : 'w-[min(546px,100%)] py-[clamp(36px,8vw,66px)] px-[clamp(24px,6vw,67px)]'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo with the party popper beside it; the popper sits in a 36px slot as in Figma. */}
        <div className="flex items-start gap-2">
          <Logo as="p" size={40} className="text-celebrate-green" variant="small" />
          <img className="mt-[6.4px] mr-[2.2px] ml-[2.3px] animate-wiggle" src={partyIcon} alt="" width="31.5" height="30.4" />
        </div>

        {wholeDay ? (
          <>
            <p id="celebration-title" className="w-full text-left text-modal leading-[1.2]">
              You did it {name}! You have checked out all the tasks today and earned {starsEarned} {stars}
              <img className="inline-block align-[-0.12em]" src={dayStar} alt="" width="36" height="33" />! Do you want
              to get a sticker from the star shop?
            </p>
            <button ref={focusTarget} type="button" className="min-w-[200px] h-16 px-8 rounded-[32px] bg-brand-green text-white font-heading font-semibold text-[28px] transition-transform hover:scale-105" onClick={onShop}>
              To star shop
            </button>
          </>
        ) : (
          <p id="celebration-title" className="w-full text-left text-modal leading-[1.2]">
            {cheer.text} {name}! All {periodLabel.toLowerCase()} tasks are checked!!!
            <br />
            You’ve earned {starsEarned} {stars}
            <img
              className="inline-block ml-[0.3em] align-[-0.12em]"
              src={cheer.star} alt="" width={cheer.width} height={cheer.height} />
          </p>
        )}

        {/* The design has no close button; this gives keyboard and screen reader users one. */}
        <button
          ref={wholeDay ? undefined : focusTarget}
          type="button"
          className="sr-only"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Backdrop>
  )
}
