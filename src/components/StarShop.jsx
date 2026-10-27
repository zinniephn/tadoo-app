import { SHOP_ITEMS } from '../state/rewards'
import StickerArt from './StickerArt'
import priceStar from '../assets/price-star.svg'
import ownedCheck from '../assets/owned-check.svg'

// Figma "Shop item": owned, affordable ("Get it!") or still saving up (progress bar).
export default function StarShop({ stars, owned, onGet }) {
  return (
    <ul className="star-grid">
      {SHOP_ITEMS.map((item) => {
        const missing = item.price - stars
        return (
          <li key={item.id} className="reward-card">
            <span className="reward-card__art">
              <StickerArt id={item.id} box={[113, 95]} />
            </span>
            <p className="reward-card__name">{item.name}</p>
            <p className="price">
              <img src={priceStar} alt="" width="32" height="32" />
              {item.price}
              <span className="visually-hidden"> stars</span>
            </p>
            {owned.includes(item.id) ? (
              <p className="owned">
                <img src={ownedCheck} alt="" width="34" height="34" />
                In your book
              </p>
            ) : missing <= 0 ? (
              <button type="button" className="get-button" onClick={() => onGet(item.id)}>
                Get it!
                <span className="visually-hidden"> {item.name}</span>
              </button>
            ) : (
              <div className="saving">
                <div className="saving__bar">
                  <div className="saving__fill" style={{ width: `${(stars / item.price) * 100}%` }} />
                </div>
                <p className="saving__text">
                  {missing} more {missing === 1 ? 'star' : 'stars'}
                </p>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
