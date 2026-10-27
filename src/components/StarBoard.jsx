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
import './TaskBoard.css'
import './StarBoard.css'

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
    stickers: 'Your sticker book',
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
      <div className="star-intro">
        <button type="button" className="back-button" onClick={onBack}>
          <img src={backArrow} alt="" width="28" height="28" />
          My Day
        </button>
        <p className="star-intro__text">{intro}</p>
      </div>

      <section className="board" aria-label="Stars">
        <div className="board__tabs" role="tablist" aria-label="Stars" onKeyDown={handleTabKeys}>
          {STAR_TABS.map((t) => {
            const selected = t.id === screen
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="star-panel"
                tabIndex={selected ? 0 : -1}
                className={`board__tab ${selected ? 'board__tab--active' : ''}`}
                style={{ '--tab-color': t.color }}
                onClick={() => onSelect(t.id)}
              >
                <img src={t.icon} alt="" width="36" height="36" />
                <span className="board__tab-label">{t.label}</span>
              </button>
            )
          })}
        </div>

        <div
          id="star-panel"
          role="tabpanel"
          aria-labelledby={`tab-${screen}`}
          className="star-panel"
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
