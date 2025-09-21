export const allChars = [
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'0123456789'
]

export const characterGroups = (() => {
  // 36 chars -> 8 groups: four 5-char groups + four 4-char groups
  const groups = []
  const sizes = [5,4,5,4,5,4,5,4]
  let idx = 0
  for (let s of sizes) {
    groups.push({ chars: allChars.slice(idx, idx + s) })
    idx += s
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
