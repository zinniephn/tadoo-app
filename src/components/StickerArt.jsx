import cat from '../assets/art/cat.svg'
import owl from '../assets/art/owl.svg'
import pretzel from '../assets/art/pretzel.svg'
import heart1 from '../assets/art/heart-1.svg'
import heart2 from '../assets/art/heart-2.png'
import heart3 from '../assets/art/heart-3.svg'
import heart4 from '../assets/art/heart-4.svg'
import heart5 from '../assets/art/heart-5.svg'
import heart6 from '../assets/art/heart-6.svg'
import robot1 from '../assets/art/robot-1.svg'
import robot2 from '../assets/art/robot-2.svg'
import robot3 from '../assets/art/robot-3.svg'
import robot4 from '../assets/art/robot-4.svg'
import robot5 from '../assets/art/robot-5.svg'
import robot6 from '../assets/art/robot-6.svg'
import robot7 from '../assets/art/robot-7.svg'
import ufo1 from '../assets/art/ufo-1.png'
import ufo2 from '../assets/art/ufo-2.svg'
import ufo3 from '../assets/art/ufo-3.svg'
import ufo4 from '../assets/art/ufo-4.svg'
import ufo5 from '../assets/art/ufo-5.svg'
import ufo6 from '../assets/art/ufo-6.svg'
import ufo7 from '../assets/art/ufo-7.svg'
import ufo8 from '../assets/art/ufo-8.svg'

// Sticker art from the Figma components, at their native size.
// Layered art keeps Figma's layer boxes: `inset` places a layer, `pad` is the image's
// overflow inside that box, `turn` is a rotated layer ([width, height, angle] as in Figma).
const ART = {
  cat: { width: 113, height: 85, layers: [{ src: cat }] },
  owl: { width: 115, height: 119, layers: [{ src: owl }] },
  pretzel: { width: 104, height: 91, layers: [{ src: pretzel }] },
  heart: {
    width: 116,
    height: 91,
    layers: [
      { src: heart1, inset: '32.97% 56.03% 3.3% 1.72%' },
      { src: heart2, inset: '2.2% 3.45% 3.3% 3.45%' },
      { src: heart3, inset: '23.08% 12.07% 3.3% 12.07%' },
      { src: heart4, inset: '32.45% 55.83% 26.01% 15.8%' },
      { src: heart5, inset: '15.38% 15.52% 61.54% 69.83%' },
      {
        src: heart6,
        inset: '62.45% 1.78% 2.2% 73.02%',
        turn: ['hypot(97.9769cqw, 1.66367cqh)', 'hypot(-2.02312cqw, 98.3363cqh)', '1.07deg'],
        pad: '-2.9% -1.4% -1.31% -3.18%',
      },
    ],
  },
  robot: {
    width: 114.286,
    height: 95.536,
    layers: [
      { src: robot1, inset: '13.08% 5.47% 0 5.47%' },
      { outline: true, inset: '13.08% 5.47% 0 5.47%' },
      { src: robot2, inset: '68.04% 26.19% 15.22% 25.69%' },
      { src: robot3, inset: '39.25% 0 38.32% 0' },
      { src: robot4, inset: '0 64.06% 86.92% 22.66%', pad: '-8% 0 0 0' },
      { src: robot5, inset: '1.87% 22.66% 86.92% 64.06%', pad: '-9.33% 0 0 0' },
      { src: robot6, inset: '37.68% 60.31% 41.38% 22.19%' },
      { src: robot7, inset: '37.68% 23.56% 41.38% 58.94%' },
    ],
  },
  ufo: {
    width: 106,
    height: 94,
    clip: true,
    layers: [
      { src: ufo1, inset: '37.23% -10.38% 0 12.26%', pad: '0 11.79% 0 4.29%' },
      { src: ufo2, inset: '37.23% 13.65% 0 16.47%' },
      {
        src: ufo3,
        inset: '-15.96% 22.39% 37.52% -10.33%',
        turn: ['hypot(80.6058cqw, -48.6678cqh)', 'hypot(19.3942cqw, 51.3322cqh)', '-25.53deg'],
      },
      {
        src: ufo4,
        inset: '13.99% 34.85% 65.65% 44.79%',
        turn: ['hypot(97.8113cqw, 2.80002cqh)', 'hypot(-2.1887cqw, 97.2cqh)', '1.45deg'],
        pad: '-2.31% -4.28% -4.86% -2.02%',
      },
      {
        src: ufo5,
        inset: '58.59% 56.59% 4.01% 8.66%',
        turn: ['hypot(-66.9396cqw, 41.5612cqh)', 'hypot(-33.0604cqw, -58.4388cqh)', '149.35deg'],
      },
      { src: ufo6, inset: '58.59% 67.73% 12.11% 19.65%' },
      {
        color: '#1983e5',
        inset: '58.51% 37.99% 11.91% 35.85%',
        turn: ['hypot(39.4789cqw, 61.154cqh)', 'hypot(-60.5211cqw, 38.846cqh)', '57.23deg'],
      },
      { src: ufo7, inset: '42.55% 13.21% 29.79% 62.26%' },
      { src: ufo8, inset: '50.03% 19.27% 29.79% 62.26%' },
    ],
  },
}

function Layer({ src, color, outline, pad }) {
  if (outline) return <span className="absolute inset-0 border-2 border-[#006fff] rounded-2xl" />
  if (color) return <span className="absolute inset-0" style={{ background: color }} />
  return (
    <span className="absolute inset-0" style={pad ? { inset: pad } : undefined}>
      <img className="block size-full" src={src} alt="" />
    </span>
  )
}

// Scales the art down (never up) to fit a `box` of [width, height].
export default function StickerArt({ id, box }) {
  const art = ART[id]
  const scale = Math.min(1, box[0] / art.width, box[1] / art.height)
  return (
    <span className="relative block shrink-0" style={{ width: art.width * scale, height: art.height * scale }}>
      <span
        className={`absolute top-0 left-0 origin-top-left ${art.clip ? 'overflow-hidden' : ''}`}
        style={{ width: art.width, height: art.height, transform: `scale(${scale})` }}
      >
        {art.layers.map(({ inset = '0', turn, ...layer }, i) =>
          // Rotated layers are sized from their box with container units, as Figma exports them.
          turn ? (
            <span
              key={i}
              className="absolute flex items-center justify-center [container-type:size]"
              style={{ inset }}
            >
              <span className="relative flex-none" style={{ width: turn[0], height: turn[1], rotate: turn[2] }}>
                <Layer {...layer} />
              </span>
            </span>
          ) : (
            <span key={i} className="absolute" style={{ inset }}>
              <Layer {...layer} />
            </span>
          ),
        )}
      </span>
    </span>
  )
}
