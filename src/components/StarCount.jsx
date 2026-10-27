import starIcon from '../assets/star-badge.svg'
import accountStarIcon from '../assets/account-star.svg'
import './StarCount.css'

// The yellow star with a number on it. 'account' is the larger star in the name badge.
export default function StarCount({ count, variant = 'default', className = '' }) {
  return (
    <span className={`star-count star-count--${variant} ${className}`}>
      <img className="star-count__star" src={variant === 'account' ? accountStarIcon : starIcon} alt="" />
      <span className="star-count__number">{count}</span>
    </span>
  )
}
