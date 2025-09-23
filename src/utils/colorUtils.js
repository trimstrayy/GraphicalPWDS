// A diverse, high-contrast 12-color palette (distinct hues around the wheel)
export const defaultPalette = [
  '#e6194B', // red
  '#f58231', // orange
  '#ffe119', // yellow
  '#bfef45', // lime
  '#3cb44b', // green
  '#42d4f4', // cyan
  '#4363d8', // blue
  '#911eb4', // purple
  '#f032e6', // magenta
  '#aaffc3', // mint
  '#ffd8b1', // apricot
  '#fabed4'  // pink
]

// Legacy palette previously used in the app; kept for backward compatibility
export const legacyPalette = [
  '#ef4444', // red
  '#f59e0b', // amber
  '#eab308', // yellow
  '#22c55e', // green
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#ec4899', // pink
  '#f43f5e'  // rose
]

function norm(hex) {
  return (hex || '').toLowerCase()
}

// Map any stored color (legacy or current) to a color from the current default palette
export function mapToDefaultPalette(color) {
  const c = norm(color)
  const idxCurrent = defaultPalette.findIndex(p => norm(p) === c)
  if (idxCurrent >= 0) return defaultPalette[idxCurrent]
  const idxLegacy = legacyPalette.findIndex(p => norm(p) === c)
  // Map legacy index onto the new palette at the same position
  if (idxLegacy >= 0) return defaultPalette[idxLegacy % defaultPalette.length]
  // Fallback to palette[0]
  return defaultPalette[0]
}

export function contrastColor(hex) {
  const c = hex.replace('#','')
  const r = parseInt(c.substr(0,2),16)
  const g = parseInt(c.substr(2,2),16)
  const b = parseInt(c.substr(4,2),16)
  const yiq = (r*299+g*587+b*114)/1000
  return yiq >= 128 ? '#111' : '#fff'
}
