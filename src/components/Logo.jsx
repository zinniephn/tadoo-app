import badgeIcon from '../assets/logo-badge.svg'
import checkIcon from '../assets/logo-check.svg'
import smallBadgeIcon from '../assets/logo-small-badge.svg'
import smallCheckIcon from '../assets/logo-small-check.svg'

// The Figma "Logo" variants: badge circle + check drawn as two layers.
const LAYERED = {
  default: { circle: badgeIcon, check: checkIcon },
  small: { circle: smallBadgeIcon, check: smallCheckIcon },
}

// "Tadoo!" with the check badge sitting in the last "o", as in Figma.
// Sized in em so the same logo works at any font size.
// variant: 'default' (header), 'small' (pop-ups). className sets the text color.
// Badge positions are the Figma offsets divided by the font size.
export default function Logo({ size = 64, className = 'text-brand-green', variant = 'default', as: Tag = 'h1' }) {
  const layers = LAYERED[variant]
  const small = variant === 'small'
  return (
    <Tag
      className={`relative inline-block font-heading font-bold leading-[1.2] whitespace-nowrap ${className}`}
      style={{ fontSize: size }}
    >
      Tadoo!
      <span className={`absolute left-[2.25em] top-[0.5em] ${small ? 'size-[0.45em]' : 'size-[0.4375em]'}`}>
        <img className="size-full" src={layers.circle} alt="" />
        <img
          className={`absolute ${small ? 'left-[0.109em] top-[0.135em] w-[0.252em] h-[0.176em]' : 'left-[0.102em] top-[0.133em] w-[0.266em] h-[0.1875em]'}`}
          src={layers.check}
          alt=""
        />
      </span>
    </Tag>
  )
}
