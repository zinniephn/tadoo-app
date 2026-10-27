import badgeIcon from '../assets/logo-badge.svg'
import checkIcon from '../assets/logo-check.svg'
import smallBadgeIcon from '../assets/logo-small-badge.svg'
import smallCheckIcon from '../assets/logo-small-check.svg'
import './Logo.css'

// The Figma "Logo" variants: badge circle + check drawn as two layers.
const LAYERED = {
  default: { circle: badgeIcon, check: checkIcon },
  small: { circle: smallBadgeIcon, check: smallCheckIcon },
}

// "Tadoo!" with the check badge sitting in the last "o", as in Figma.
// Sized in em so the same logo works at any font size.
// variant: 'default' (header), 'small' (pop-ups).
export default function Logo({ size = 64, color = 'var(--brand-green)', variant = 'default', as: Tag = 'h1' }) {
  const layers = LAYERED[variant]
  return (
    <Tag className={`logo logo--${variant}`} style={{ fontSize: size, color }}>
      Tadoo!
      <span className="logo__badge">
        <img className="logo__circle" src={layers.circle} alt="" />
        <img className="logo__check" src={layers.check} alt="" />
      </span>
    </Tag>
  )
}
