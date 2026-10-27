import Logo from './Logo'
import StarCount from './StarCount'
import smallStarIcon from '../assets/star-small.svg'
import calendarIcon from '../assets/calendar.svg'
import './Header.css'

const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

// `day` is the saved "YYYY-M-D" key, so the date follows the app's day reset.
function formatDay(day) {
  const [y, m, d] = day.split('-').map(Number)
  return dateFormat.format(new Date(y, m - 1, d)).replace(',', '')
}

// The star screens show only the top row (logo + Account button).
export default function Header({ name, stars, day, onOpenMenu, topOnly = false }) {
  return (
    <header className="header">
      <div className="header__top">
        <Logo size="clamp(44px, 5vw + 20px, 64px)" />
        <button
          type="button"
          className="account"
          onClick={onOpenMenu}
          aria-haspopup="dialog"
          aria-label={`${name}, ${stars} stars. Open menu`}
        >
          <span className="account__name">{name}</span>
          {/* key makes the star bounce every time the count changes */}
          <StarCount key={stars} count={stars} variant="account" className="star-count--bump" />
        </button>
      </div>

      {!topOnly && (
        <>
          <p className="header__greeting">
        Hello {name}! Check all your tasks today to earn more stars!
        <img src={smallStarIcon} alt="" width="24" height="24" />
      </p>

      <p className="header__date">
        <img src={calendarIcon} alt="" width="36" height="36" />
        Today, {formatDay(day)}
      </p>
        </>
      )}
    </header>
  )
}
