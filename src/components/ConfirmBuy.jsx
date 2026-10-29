import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import Logo from './Logo'
import StickerArt from './StickerArt'
import confirmStar from '../assets/confirm-star.svg'
import { Backdrop, ModalButton } from './ui'

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
    <Backdrop onClick={onNo}>
      <div
        className="flex flex-col items-center gap-7 w-[min(557px,100%)] pt-[52px] px-[clamp(20px,5vw,56px)] pb-12 rounded-[49px] bg-celebrate-bg drop-shadow-[10px_10px_2px_rgb(188_184_184/0.25)] text-celebrate-green font-heading animate-card-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-buy-question"
        onClick={(e) => e.stopPropagation()}
      >
        <Logo as="p" size={40} className="text-celebrate-green" variant="small" />
        <div className="flex items-center gap-2 max-[480px]:flex-col max-[480px]:text-center">
          <StickerArt id={item.id} box={[96, 96]} />
          <p id="confirm-buy-question" className="text-modal">
            Get {item.name} for {item.price}
            <img className="inline-block mx-2 align-[-6px]" src={confirmStar} alt=" stars" width="40" height="40" />?
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <ModalButton ref={yesButton} onClick={buy}>
            Yes!
          </ModalButton>
          <ModalButton variant="no" onClick={onNo}>
            No
          </ModalButton>
        </div>
      </div>
    </Backdrop>
  )
}
