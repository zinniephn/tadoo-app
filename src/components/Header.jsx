import Logo from './Logo'
import StarCount from './StarCount'
import smallStarIcon from '../assets/star-small.svg'
import calendarIcon from '../assets/calendar-small.svg'
import backArrow from '../assets/back-arrow.svg'
import forwardArrow from '../assets/forward-arrow.svg'
import { dayAfter } from '../state/useTadoo'
import './Header.css'

const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

// `day` is the saved "YYYY-M-D" key, so the date follows the app's day reset.
function formatDay(day) {
  const [y, m, d] = day.split('-').map(Number)
  return dateFormat.format(new Date(y, m - 1, d)).replace(',', '')
}

// The star screens show only the top row (logo + Account button).
// viewDay is 'today' or 'tomorrow' (planning ahead); onSwitchDay flips between them.
export default function Header({ name, stars, day, onOpenMenu, topOnly = false, viewDay = 'today', onSwitchDay }) {
  const tomorrow = viewDay === 'tomorrow'
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
            {tomorrow
              ? 'Plan your tasks for tomorrow! You can check them when tomorrow comes.'
              : `Hello ${name}! Check all your tasks today to earn more stars!`}
            <img src={smallStarIcon} alt="" width="24" height="24" />
          </p>

          <div className="header__date-row">
            <p className="header__date">
              <img src={calendarIcon} alt="" width="30" height="30" />
              {tomorrow ? `Tomorrow, ${formatDay(dayAfter(day))}` : `Today, ${formatDay(day)}`}
            </p>
            {/* Figma "Day switch" */}
            <button type="button" className="day-switch" onClick={onSwitchDay}>
              {tomorrow ? (
                <>
                  <img src={backArrow} alt="" width="28" height="28" />
                  Today
                </>
              ) : (
                <>
                  Tomorrow
                  <img src={forwardArrow} alt="" width="28" height="28" />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </header>
  )
}
