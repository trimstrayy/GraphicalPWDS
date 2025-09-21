export const defaultPalette = [
  '#ff6b6b', // red
  '#feca57', // orange
  '#feca0a', // yellow-ish accent
  '#1dd1a1', // green
  '#54a0ff', // blue
  '#5f27cd', // indigo
  '#ee5253', // coral
  '#10ac84'  // teal
]

export function contrastColor(hex) {
  const c = hex.replace('#','')
  const r = parseInt(c.substr(0,2),16)
  const g = parseInt(c.substr(2,2),16)
  const b = parseInt(c.substr(4,2),16)
  const yiq = (r*299+g*587+b*114)/1000
  return yiq >= 128 ? '#111' : '#fff'
}
