import { useEffect, useRef } from 'react'
import closeIcon from '../assets/icon-close.svg'
import chevronIcon from '../assets/icon-chevron.svg'
import owlAvatar from '../assets/avatar-owl.svg'
import starIcon from '../assets/drawer-star.svg'
import clipboardIcon from '../assets/drawer-clipboard.svg'
import shopIcon from '../assets/icon-shop.svg'
import stickersIcon from '../assets/icon-stickers.svg'
import badgesIcon from '../assets/icon-badges.svg'
import accountIcon from '../assets/icon-account.svg'

const LINKS = [
  { id: 'tasks', label: 'My daily tasks', icon: clipboardIcon, color: '#fff6d6' },
  { id: 'shop', label: 'Star Shop', icon: shopIcon, color: '#defffc' },
  { id: 'stickers', label: 'My Stickers', icon: stickersIcon, color: '#fdeef4' },
  { id: 'badges', label: 'My Badges', icon: badgesIcon, color: '#eaf3de' },
]

function DrawerItem({ link, onClick }) {
  return (
    <button
      type="button"
      className="flex items-center gap-4 w-full min-h-22 pr-5 pl-6 rounded-3xl text-left transition-transform hover:scale-102 active:scale-98 max-[480px]:min-h-18"
      style={{ background: link.color }}
      onClick={onClick}
    >
      <span className="grid place-items-center shrink-0 size-9">
        <img className="shrink-0" src={link.icon} alt="" />
      </span>
      <span className="flex-1 min-w-0 font-heading font-medium text-[30px] text-black max-[480px]:text-[24px]">
        {link.label}
      </span>
      <img className="shrink-0" src={chevronIcon} alt="" width="28" height="28" />
    </button>
  )
}

// Figma "Account drawer": slides in from the right when the Account button is clicked.
// onGo(id) opens 'tasks' (My Day), 'shop', 'stickers' or 'badges'.
export default function AccountDrawer({ name, stars, onClose, onGo, onEditName }) {
  const closeButton = useRef(null)

  useEffect(() => {
    closeButton.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-900 flex justify-end bg-backdrop animate-fade-in" onClick={onClose}>
      <nav
        className="flex flex-col gap-5 w-[min(420px,100%)] h-full overflow-y-auto pt-7 px-6 pb-10 rounded-l-[40px] bg-background drop-shadow-[-8px_0_12px_rgb(0_0_0/0.15)] animate-drawer-in max-[480px]:gap-4 max-[480px]:pt-5 max-[480px]:px-4 max-[480px]:pb-8"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            ref={closeButton}
            type="button"
            className="grid place-items-center size-16 border border-line rounded-[32px] bg-white transition-transform hover:scale-105"
            onClick={onClose}
            aria-label="Close menu"
          >
            <img src={closeIcon} alt="" width="28" height="28" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 pb-3">
          <div className="grid place-items-center size-32 rounded-[64px] bg-[#ffe3c2]">
            <img src={owlAvatar} alt="" width="92" height="95" />
          </div>
          <p className="max-w-full truncate font-heading font-semibold text-[36px]">{name}</p>
          <p className="flex items-center gap-2 font-heading font-medium text-[28px] text-star-number">
            <img src={starIcon} alt="" width="36" height="36" />
            {stars} {stars === 1 ? 'star' : 'stars'}
          </p>
        </div>

        <p className="font-body font-semibold text-[22px] text-muted">Go to</p>
        <div className="flex flex-col gap-3">
          {LINKS.map((link) => (
            <DrawerItem key={link.id} link={link} onClick={() => onGo(link.id)} />
          ))}
        </div>

        <hr className="w-full h-0.5 border-0 rounded-[1px] bg-line" />
        <DrawerItem
          link={{ id: 'account', label: 'My Account', icon: accountIcon, color: '#e7fbff' }}
          onClick={onEditName}
        />
      </nav>
    </div>
  )
}
