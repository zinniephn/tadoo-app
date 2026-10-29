import Logo from './Logo'
import StarCount from './StarCount'
import smallStarIcon from '../assets/star-small.svg'
import calendarIcon from '../assets/calendar-small.svg'
import backArrow from '../assets/back-arrow.svg'
import forwardArrow from '../assets/forward-arrow.svg'
import { dayAfter } from '../state/useTadoo'
import { DaySwitch } from './ui'

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
      <div className="flex items-center justify-between gap-4">
        <Logo size="clamp(44px, 5vw + 20px, 64px)" />
        <button
          type="button"
          className="inline-flex items-center gap-2 py-2.5 px-6 rounded-[30px] bg-account-red transition-transform hover:scale-103 active:scale-97 max-[600px]:py-1 max-[600px]:pr-3 max-[600px]:pl-[18px]"
          onClick={onOpenMenu}
          aria-haspopup="dialog"
          aria-label={`${name}, ${stars} stars. Open menu`}
        >
          <span className="max-w-[14ch] truncate font-heading font-semibold text-[32px] leading-[1.2] text-white max-[600px]:max-w-[9ch] max-[600px]:text-[22px]">
            {name}
          </span>
          {/* key makes the star bounce every time the count changes */}
          <StarCount key={stars} count={stars} variant="account" className="animate-star-bump" />
        </button>
      </div>

      {!topOnly && (
        <>
          <p className="mt-[45px] font-body font-semibold text-greeting max-[600px]:mt-7">
            {tomorrow
              ? 'Plan your tasks for tomorrow! You can check them when tomorrow comes.'
              : `Hello ${name}! Check all your tasks today to earn more stars!`}
            {/* inline so the star stays next to the last word when the text wraps */}
            <img className="inline-block ml-[9px] align-[-3px]" src={smallStarIcon} alt="" width="24" height="24" />
          </p>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mt-[45px] max-[600px]:mt-7">
            <p className="flex items-center gap-2 font-heading font-medium text-date leading-[1.2]">
              <img className="shrink-0" src={calendarIcon} alt="" width="30" height="30" />
              {tomorrow ? `Tomorrow, ${formatDay(dayAfter(day))}` : `Today, ${formatDay(day)}`}
            </p>
            {/* Figma "Day switch" */}
            <DaySwitch onClick={onSwitchDay}>
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
            </DaySwitch>
          </div>
        </>
      )}
    </header>
  )
}
