import { SHOP_ITEMS } from '../state/rewards'
import StickerArt from './StickerArt'
import priceStar from '../assets/price-star.svg'
import ownedCheck from '../assets/owned-check.svg'
import { RewardCard, RewardName, StarGrid } from './ui'

// Figma "Shop item": owned, affordable ("Get it!") or still saving up (progress bar).
export default function StarShop({ stars, owned, onGet }) {
  return (
    <StarGrid>
      {SHOP_ITEMS.map((item) => {
        const missing = item.price - stars
        return (
          <RewardCard key={item.id}>
            <span className="grid place-items-center size-30 max-[600px]:size-24">
              <StickerArt id={item.id} box={[113, 95]} />
            </span>
            <RewardName>{item.name}</RewardName>
            <p className="flex items-center gap-1.5 font-heading font-semibold text-[28px] text-star-number max-[600px]:text-[22px]">
              <img src={priceStar} alt="" width="32" height="32" />
              {item.price}
              <span className="sr-only"> stars</span>
            </p>
            {owned.includes(item.id) ? (
              <p className="flex items-center justify-center gap-2 h-16 font-heading font-medium text-[26px] text-celebrate-green max-[600px]:h-[52px] max-[600px]:text-[18px]">
                <img className="max-[600px]:size-[26px]" src={ownedCheck} alt="" width="34" height="34" />
                In your book
              </p>
            ) : missing <= 0 ? (
              <button
                type="button"
                className="w-full h-16 px-4 rounded-[32px] bg-add-blue text-white font-heading font-semibold text-[28px] transition-transform hover:scale-104 max-[600px]:h-[52px] max-[600px]:text-[22px]"
                onClick={() => onGet(item.id)}
              >
                Get it!
                <span className="sr-only"> {item.name}</span>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2 w-full pt-3 pb-1.5">
                <div className="w-full h-4 rounded-lg bg-[#eee] overflow-hidden">
                  <div className="h-full rounded-lg bg-[#ffd43b]" style={{ width: `${(stars / item.price) * 100}%` }} />
                </div>
                <p className="font-body font-semibold text-[22px] text-muted max-[600px]:text-[16px]">
                  {missing} more {missing === 1 ? 'star' : 'stars'}
                </p>
              </div>
            )}
          </RewardCard>
        )
      })}
    </StarGrid>
  )
}
