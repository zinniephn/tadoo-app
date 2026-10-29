import { useState } from 'react'
import { SHOP_ITEMS, STICKER_PAGES } from '../state/rewards'
import StickerArt from './StickerArt'
import { RewardCard, RewardCircle, RewardName, StarGrid } from './ui'

// Figma "My Stickers": one page of the book at a time, with page tabs at the bottom.
export default function StickerBook({ owned }) {
  const [pageId, setPageId] = useState(STICKER_PAGES[0].id)
  const page = STICKER_PAGES.find((p) => p.id === pageId)
  const collected = page.items.filter((id) => owned.includes(id)).length

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 className="font-heading font-medium text-[32px] text-[#72243e]">{page.label}</h2>
        <p className="font-body font-semibold text-[24px] text-[#993556]">
          {collected} of {page.items.length} collected
        </p>
      </div>

      <StarGrid>
        {page.items.map((id) =>
          owned.includes(id) ? (
            <RewardCard key={id}>
              <StickerArt id={id} box={[106, 94]} />
              <RewardName>{SHOP_ITEMS.find((i) => i.id === id).name}</RewardName>
            </RewardCard>
          ) : (
            <RewardCard key={id} look="empty">
              <RewardCircle look="empty" aria-hidden="true">
                ?
              </RewardCircle>
              <RewardName>
                ???<span className="sr-only"> Not collected yet</span>
              </RewardName>
            </RewardCard>
          ),
        )}
      </StarGrid>

      <div className="flex flex-wrap justify-center gap-3" aria-label="Sticker pages">
        {STICKER_PAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`py-2.5 px-6 rounded-3xl font-heading font-medium text-[24px] text-[#72243e] ${p.id === pageId ? 'bg-white' : 'bg-[#f8dce7]'}`}
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
