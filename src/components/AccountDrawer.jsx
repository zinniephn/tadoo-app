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
import './AccountDrawer.css'

const LINKS = [
  { id: 'tasks', label: 'My daily tasks', icon: clipboardIcon, color: '#fff6d6' },
  { id: 'shop', label: 'Star Shop', icon: shopIcon, color: '#defffc' },
  { id: 'stickers', label: 'My Stickers', icon: stickersIcon, color: '#fdeef4' },
  { id: 'badges', label: 'My Badges', icon: badgesIcon, color: '#eaf3de' },
]

function DrawerItem({ link, onClick }) {
  return (
    <button type="button" className="drawer-item" style={{ background: link.color }} onClick={onClick}>
      <span className="drawer-item__icon">
        <img src={link.icon} alt="" />
      </span>
      <span className="drawer-item__label">{link.label}</span>
      <img src={chevronIcon} alt="" width="28" height="28" />
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
    <div className="drawer-backdrop" onClick={onClose}>
      <nav
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer__close-row">
          <button ref={closeButton} type="button" className="drawer__close" onClick={onClose} aria-label="Close menu">
            <img src={closeIcon} alt="" width="28" height="28" />
          </button>
        </div>

        <div className="drawer__profile">
          <div className="drawer__avatar">
            <img src={owlAvatar} alt="" width="92" height="95" />
          </div>
          <p className="drawer__name">{name}</p>
          <p className="drawer__stars">
            <img src={starIcon} alt="" width="36" height="36" />
            {stars} {stars === 1 ? 'star' : 'stars'}
          </p>
        </div>

        <p className="drawer__heading">Go to</p>
        <div className="drawer__links">
          {LINKS.map((link) => (
            <DrawerItem key={link.id} link={link} onClick={() => onGo(link.id)} />
          ))}
        </div>

        <hr className="drawer__divider" />
        <DrawerItem
          link={{ id: 'account', label: 'My Account', icon: accountIcon, color: '#e7fbff' }}
          onClick={onEditName}
        />
      </nav>
    </div>
  )
}
