// Small building blocks shared by several screens.

// Grey see-through layer behind pop-ups. Clicking it closes the pop-up.
export function Backdrop({ onClick, children }) {
  return (
    <div
      className="fixed inset-0 z-1000 grid place-items-center p-4 bg-backdrop animate-fade-in"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// The pair of round buttons at the bottom of pop-ups: green "Yes!" and white "No".
export function ModalButton({ variant = 'yes', className = '', ...props }) {
  const look =
    variant === 'yes'
      ? 'bg-brand-green text-white'
      : 'border-3 border-brand-green bg-white text-celebrate-green'
  return (
    <button
      type="button"
      className={`w-[200px] h-16 rounded-[32px] font-heading font-semibold text-[28px] transition-transform enabled:hover:scale-105 disabled:opacity-50 max-[480px]:w-[130px] ${look} ${className}`}
      {...props}
    />
  )
}

// Figma "Day switch": the Today/Tomorrow button, also used for "My day".
export function DaySwitch(props) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 py-2.5 px-3.5 rounded-[32px] font-heading font-medium text-date transition-colors hover:bg-black/5"
      {...props}
    />
  )
}

// The coloured tabs on top of a board (Morning/Afternoon/Evening, Star Shop/Stickers/Badges).
export function BoardTabs(props) {
  return <div role="tablist" className="flex gap-2" {...props} />
}

export function BoardTab({ selected, color, icon, label, children, ...props }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={`flex-[1_1_0] min-w-0 h-[81px] flex items-center justify-center gap-4 py-3.5 px-3 rounded-t-3xl bg-(--tab-color) font-heading text-[length:clamp(22px,3vw_+_8px,36px)] transition-[filter] max-[700px]:flex-col max-[700px]:gap-0.5 max-[700px]:h-[88px] max-[700px]:py-2.5 max-[700px]:px-1 max-[700px]:text-[18px] ${selected ? '' : 'hover:brightness-97'}`}
      style={{ '--tab-color': color }}
      {...props}
    >
      <img className="shrink-0 max-[700px]:size-8" src={icon} alt="" width="36" height="36" />
      <span>{label}</span>
      {children}
    </button>
  )
}

// Grid of cards on the star screens (shop items, stickers, badges).
export function StarGrid({ children }) {
  return (
    <ul className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:gap-3">{children}</ul>
  )
}

// look: 'white' (normal card), 'locked' (badge not earned yet) or 'empty' (sticker not collected yet).
const CARD_LOOKS = {
  white: 'bg-white',
  locked: 'border-3 border-dashed border-[#b9d79a]',
  empty: 'border-3 border-dashed border-[#e9b7cb] text-[#c27a97]',
}

export function RewardCard({ look = 'white', children }) {
  return (
    <li
      className={`flex flex-col items-center justify-center gap-3 min-w-0 p-6 rounded-3xl text-center max-[600px]:py-4 max-[600px]:px-2.5 max-[600px]:gap-2 ${CARD_LOOKS[look]}`}
    >
      {children}
    </li>
  )
}

export function RewardName({ children }) {
  return (
    <p className="font-heading font-medium text-[28px] wrap-anywhere max-[600px]:text-[22px]">{children}</p>
  )
}

const CIRCLE_COLORS = { white: 'bg-[#ffe066]', locked: 'bg-[#f3f9ea]', empty: 'bg-[#f8dce7]' }

// Round spot for a badge star or the "?" of a missing sticker.
export function RewardCircle({ look = 'white', children, ...props }) {
  return (
    <span
      className={`grid place-items-center size-30 rounded-[60px] font-heading font-semibold text-[56px] max-[600px]:size-24 ${CIRCLE_COLORS[look]}`}
      {...props}
    >
      {children}
    </span>
  )
}
