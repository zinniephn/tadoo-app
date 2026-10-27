import { useState } from 'react'
import { SHOP_ITEMS, STICKER_PAGES } from '../state/rewards'
import StickerArt from './StickerArt'

// Figma "My Stickers": one page of the book at a time, with page tabs at the bottom.
export default function StickerBook({ owned }) {
  const [pageId, setPageId] = useState(STICKER_PAGES[0].id)
  const page = STICKER_PAGES.find((p) => p.id === pageId)
  const collected = page.items.filter((id) => owned.includes(id)).length

  return (
    <>
      <div className="book-header">
        <h2 className="book-header__title">{page.label}</h2>
        <p className="book-header__count">
          {collected} of {page.items.length} collected
        </p>
      </div>

      <ul className="star-grid">
        {page.items.map((id) =>
          owned.includes(id) ? (
            <li key={id} className="reward-card">
              <StickerArt id={id} box={[106, 94]} />
              <p className="reward-card__name">{SHOP_ITEMS.find((i) => i.id === id).name}</p>
            </li>
          ) : (
            <li key={id} className="reward-card reward-card--empty-sticker">
              <span className="reward-card__circle" aria-hidden="true">
                ?
              </span>
              <p className="reward-card__name">
                ???<span className="visually-hidden"> Not collected yet</span>
              </p>
            </li>
          ),
        )}
      </ul>

      <div className="book-pages" aria-label="Sticker pages">
        {STICKER_PAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`book-pages__tab ${p.id === pageId ? 'book-pages__tab--active' : ''}`}
            aria-pressed={p.id === pageId}
            onClick={() => setPageId(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </>
  )
}
