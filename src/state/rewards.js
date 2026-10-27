// What stars can buy, how stickers are grouped in the book, and the badges.
// Prices and names come from the Figma "Star Shop" screen.
export const SHOP_ITEMS = [
  { id: 'cat', name: 'Cat', price: 5 },
  { id: 'owl', name: 'Owl', price: 8 },
  { id: 'heart', name: 'Heart', price: 10 },
  { id: 'pretzel', name: 'Pretzel', price: 12 },
  { id: 'robot', name: 'Robot', price: 20 },
  { id: 'ufo', name: 'UFO', price: 30 },
]

export const STICKER_PAGES = [
  { id: 'animals', label: 'Animals', items: ['cat', 'owl'] },
  { id: 'space', label: 'Space', items: ['ufo', 'robot'] },
  { id: 'food', label: 'Food', items: ['pretzel', 'heart'] },
]

export const BADGES = [
  { id: 'morning-hero', name: 'Morning hero', goal: 'Finish a morning' },
  { id: 'three-days', name: '3 days in a row', goal: 'Finish 3 days in a row' },
  { id: 'book-worm', name: 'Book worm', goal: 'Read 10 times' },
  { id: 'super-helper', name: 'Super helper', goal: 'Help 10 times' },
  { id: 'star-collector', name: 'Star collector', goal: 'Earn 100 stars' },
  { id: 'full-page', name: 'Full sticker page', goal: 'Fill a sticker page' },
]

// Tasks that count toward "Book worm" and "Super helper".
export const isReadingTask = (text) => /\bread/i.test(text)
export const isHelpingTask = (text) => /\bhelp/i.test(text)

// Badges whose goal is reached in `state`. Earned badges are stored, so they stay earned.
export function reachedBadges(state) {
  const { stats, tasks, owned } = state
  const reached = []
  if (tasks.morning.length > 0 && tasks.morning.every((t) => t.done)) reached.push('morning-hero')
  if (stats.streak >= 3) reached.push('three-days')
  if (stats.read >= 10) reached.push('book-worm')
  if (stats.help >= 10) reached.push('super-helper')
  if (stats.earned >= 100) reached.push('star-collector')
  if (STICKER_PAGES.some((page) => page.items.every((id) => owned.includes(id)))) reached.push('full-page')
  return reached
}
