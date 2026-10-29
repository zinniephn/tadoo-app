import { useCallback, useState } from 'react'
import { SHOP_ITEMS } from '../state/rewards'
import StarShop from './StarShop'
import StickerBook from './StickerBook'
import BadgeList from './BadgeList'
import ConfirmBuy from './ConfirmBuy'
import backArrow from '../assets/back-arrow.svg'
import shopIcon from '../assets/tab-shop.svg'
import stickersIcon from '../assets/tab-stickers.svg'
import badgesIcon from '../assets/tab-badges.svg'
import { BoardTab, BoardTabs, DaySwitch } from './ui'

// The three star screens from Figma, shown as tabs on one board like the day's tasks.
const STAR_TABS = [
  { id: 'shop', label: 'Star Shop', icon: shopIcon, color: '#fff6d6' },
  { id: 'stickers', label: 'My Stickers', icon: stickersIcon, color: '#fdeef4' },
  { id: 'badges', label: 'My Badges', icon: badgesIcon, color: '#eaf3de' },
]

export default function StarBoard({ screen, state, onSelect, onBack, onBuy }) {
  const [buying, setBuying] = useState(null)
  const closeBuy = useCallback(() => setBuying(null), [])
  const tab = STAR_TABS.find((t) => t.id === screen)

  const intro = {
    shop: `You have ${state.stars} ${state.stars === 1 ? 'star' : 'stars'}. What do you want to get?`,
    stickers: 'Your sticker collection',
    badges: 'Badges you earn by doing your tasks',
  }[screen]

  function handleTabKeys(e) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    const index = STAR_TABS.findIndex((t) => t.id === screen)
    const next = STAR_TABS[(index + step + STAR_TABS.length) % STAR_TABS.length]
    onSelect(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 mt-[45px]">
        <p
          className={`font-body font-semibold ${screen === 'stickers' ? 'text-[length:clamp(20px,1.5vw_+_12px,28px)]' : 'text-greeting'}`}
        >
          {intro}
        </p>
        {/* Same look as the Today/Tomorrow "Day switch" */}
        <DaySwitch onClick={onBack}>
          <img src={backArrow} alt="" width="28" height="28" />
          My day
        </DaySwitch>
      </div>

      <section className="mt-[30px]" aria-label="Stars">
        <BoardTabs aria-label="Stars" onKeyDown={handleTabKeys}>
          {STAR_TABS.map((t) => (
            <BoardTab
              key={t.id}
              id={`tab-${t.id}`}
              aria-controls="star-panel"
              selected={t.id === screen}
              color={t.color}
              icon={t.icon}
              label={t.label}
              onClick={() => onSelect(t.id)}
            />
          ))}
        </BoardTabs>

        <div
          id="star-panel"
          role="tabpanel"
          aria-labelledby={`tab-${screen}`}
          className="flex flex-col gap-6 p-8 max-[600px]:gap-4 max-[600px]:p-4"
          style={{ background: tab.color }}
        >
          {screen === 'shop' && <StarShop stars={state.stars} owned={state.owned} onGet={setBuying} />}
          {screen === 'stickers' && <StickerBook owned={state.owned} />}
          {screen === 'badges' && <BadgeList earned={state.badges} />}
        </div>
      </section>

      {buying && (
        <ConfirmBuy
          item={SHOP_ITEMS.find((i) => i.id === buying)}
          onYes={() => {
            onBuy(buying)
            setBuying(null)
          }}
          onNo={closeBuy}
        />
      )}
    </>
  )
}
