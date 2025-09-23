import { allChars, characterGroups, rotateIndex, selectCharFromGroup, alignedGroupIndex } from '../utils/wheelLogic'

test('has 36 characters', () => {
  expect(allChars.length).toBe(36)
})

test('12 groups with uniform size 3', () => {
  expect(characterGroups.length).toBe(12)
  const sizes = characterGroups.map(g => g.chars.length)
  expect(sizes.every(s => s === 3)).toBe(true)
  expect(sizes.reduce((a,b)=>a+b,0)).toBe(36)
})

test('rotateIndex wraps correctly', () => {
  expect(rotateIndex(-1, 8)).toBe(7)
  expect(rotateIndex(8, 8)).toBe(0)
})

test('selectCharFromGroup returns valid char', () => {
  const c = selectCharFromGroup(0, 2)
  expect(allChars.includes(c)).toBe(true)
})

test('alignedGroupIndex maps rotation to group correctly', () => {
  // 12 sectors => 30 deg per sector
  expect(alignedGroupIndex(0, 12)).toBe(0)
  expect(alignedGroupIndex(30, 12)).toBe(1)
  expect(alignedGroupIndex(60, 12)).toBe(2)
  expect(alignedGroupIndex(-30, 12)).toBe(11)
  expect(alignedGroupIndex(360, 12)).toBe(0)
})
