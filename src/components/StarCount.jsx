import starIcon from '../assets/star-badge.svg'
import accountStarIcon from '../assets/account-star.svg'

// The yellow star with a number on it. 'account' is the larger star in the name badge.
export default function StarCount({ count, variant = 'default', className = '' }) {
  const account = variant === 'account'
  return (
    <span className={`relative inline-grid place-items-center shrink-0 ${account ? 'w-[50px] h-[46px]' : 'size-12'} ${className}`}>
      <img
        className={`absolute ${account ? 'left-[0.5px] top-[0.25px] w-[49px] h-[45.5px]' : 'left-[3px] top-[4.5px] w-[42px] h-[39px]'}`}
        src={account ? accountStarIcon : starIcon}
        alt=""
      />
      <span
        className={`relative font-heading font-semibold leading-none text-star-number ${account ? 'top-[2.5px] text-[24px]' : 'top-0.5 text-[20px]'}`}
      >
        {count}
      </span>
    </span>
  )
}
