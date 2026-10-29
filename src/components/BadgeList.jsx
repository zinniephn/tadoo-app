import { BADGES } from '../state/rewards'
import badgeStar from '../assets/badge-star.svg'
import lockedStar from '../assets/badge-star-locked.svg'
import { RewardCard, RewardCircle, RewardName, StarGrid } from './ui'

// Figma "Badge": earned badges are white cards, locked ones dashed with their goal.
export default function BadgeList({ earned }) {
  return (
    <StarGrid>
      {BADGES.map((badge) => {
        const isEarned = earned.includes(badge.id)
        return (
          <RewardCard key={badge.id} look={isEarned ? 'white' : 'locked'}>
            <RewardCircle look={isEarned ? 'white' : 'locked'}>
              <img src={isEarned ? badgeStar : lockedStar} alt="" width="64" height="64" />
            </RewardCircle>
            <RewardName>{badge.name}</RewardName>
            <p className="font-body font-semibold text-[22px] text-[#3b6d11] max-[600px]:text-[16px]">
              {isEarned ? 'Earned!' : badge.goal}
            </p>
          </RewardCard>
        )
      })}
    </StarGrid>
  )
}
