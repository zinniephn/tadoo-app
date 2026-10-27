import { BADGES } from '../state/rewards'
import badgeStar from '../assets/badge-star.svg'
import lockedStar from '../assets/badge-star-locked.svg'

// Figma "Badge": earned badges are white cards, locked ones dashed with their goal.
export default function BadgeList({ earned }) {
  return (
    <ul className="star-grid">
      {BADGES.map((badge) => {
        const isEarned = earned.includes(badge.id)
        return (
          <li key={badge.id} className={`reward-card ${isEarned ? '' : 'reward-card--locked'}`}>
            <span className="reward-card__circle">
              <img src={isEarned ? badgeStar : lockedStar} alt="" width="64" height="64" />
            </span>
            <p className="reward-card__name">{badge.name}</p>
            <p className="reward-card__detail">{isEarned ? 'Earned!' : badge.goal}</p>
          </li>
        )
      })}
    </ul>
  )
}
