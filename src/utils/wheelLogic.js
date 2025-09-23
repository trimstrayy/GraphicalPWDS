export const allChars = [
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'0123456789'
]

export const characterGroups = (() => {
  // 36 chars -> 12 groups of exactly 3 characters each
  const groups = []
  for (let i = 0; i < 12; i++) {
    const start = i * 3
    groups.push({ chars: allChars.slice(start, start + 3) })
  }
  return groups
})()

export function buildGroupedChars() {
  return characterGroups
}

export function rotateIndex(i, n) {
  return ((i % n) + n) % n
}

// Map selection based on ring index in a group
export function selectCharFromGroup(groupIndex, ringIndex) {
  const g = characterGroups[rotateIndex(groupIndex, characterGroups.length)]
  return g.chars[Math.min(ringIndex, g.chars.length - 1)]
}

// Given an accumulated selection sequence like [{groupIndex, ringIndex}...]
// derive the resulting plaintext password string.
export function buildPasswordFromSelections(selections) {
  return selections.map(({ groupIndex, ringIndex }) => selectCharFromGroup(groupIndex, ringIndex)).join('')
}

// Given current rotation in degrees and number of sectors, compute the
// group index under the sector-0 marker. Positive rotation means rotating
// the colored ring clockwise visually, which advances the aligned group.
export function alignedGroupIndex(rotationDeg, sectors = 12) {
  const anglePer = 360 / sectors
  // Round to nearest sector to avoid off-by-one due to small deltas
  const idx = Math.round(rotationDeg / anglePer)
  return rotateIndex(idx, sectors)
}
