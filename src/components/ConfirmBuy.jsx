import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import Logo from './Logo'
import StickerArt from './StickerArt'
import confirmStar from '../assets/confirm-star.svg'
import './CelebrationModal.css'
import './ConfirmBuy.css'

// Figma "Confirm buy": asks before spending stars.
export default function ConfirmBuy({ item, onYes, onNo }) {
  const yesButton = useRef(null)

  function buy() {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2caf00', '#ffcf48', '#ff5151', '#371dff', '#7fd4ff'],
      disableForReducedMotion: true,
      zIndex: 1001,
    })
    onYes()
  }

  useEffect(() => {
    yesButton.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onNo()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onNo])

  return (
    <div className="celebration" onClick={onNo}>
      <div
        className="confirm-buy"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-buy-question"
        onClick={(e) => e.stopPropagation()}
      >
        <Logo as="p" size={40} color="var(--celebrate-green)" variant="small" />
        <div className="confirm-buy__question">
          <StickerArt id={item.id} box={[96, 96]} />
          <p id="confirm-buy-question">
            Get {item.name} for {item.price}
            <img src={confirmStar} alt=" stars" width="40" height="40" />?
          </p>
        </div>
        <div className="confirm-buy__buttons">
          <button ref={yesButton} type="button" className="confirm-buy__yes" onClick={buy}>
            Yes!
          </button>
          <button type="button" className="confirm-buy__no" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}
