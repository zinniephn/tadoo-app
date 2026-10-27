import sunIcon from '../assets/sun.svg'
import cloudSunIcon from '../assets/cloud-sun.svg'
import moonIcon from '../assets/moon.svg'

// The three parts of the day. Colors come from the Figma tabs and row dividers.
export const PERIODS = [
  { id: 'morning', label: 'Morning', icon: sunIcon, color: '#fff4e0', divider: '#fbe8c6' },
  { id: 'afternoon', label: 'Afternoon', icon: cloudSunIcon, color: '#e7fbff', divider: '#b0dde4' },
  { id: 'evening', label: 'Evening', icon: moonIcon, color: '#eff3ff', divider: '#d5cdfc' },
]

export const STARTER_TASKS = {
  morning: ['Make bed', 'Change clothes', 'Eat breakfast', 'Put plates in dishwasher', 'Brush teeth', 'Go to school'],
  afternoon: ['Take shower', 'Lay the dining table', 'Help mom and dad in the kitchen', 'Eat dinner', 'Put plates to dishwasher', 'Wash hands'],
  evening: ['Play with Ellinor', 'Read a book', 'Clean the whole room upstairs', 'Brush teeth', 'Prepare clothes for the next day', 'Go to bed'],
}

export function periodForHour(hour) {
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}
