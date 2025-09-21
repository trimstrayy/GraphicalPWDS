import { allChars, characterGroups, rotateIndex, selectCharFromGroup } from '../utils/wheelLogic'

test('has 36 characters', () => {
  expect(allChars.length).toBe(36)
})

test('8 groups with sizes 5/4 pattern', () => {
  expect(characterGroups.length).toBe(8)
  const sizes = characterGroups.map(g => g.chars.length)
  expect(sizes).toEqual([5,4,5,4,5,4,5,4])
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
