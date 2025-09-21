import React from 'react'

export default function CharacterSelector({ group, onPick }) {
  // group = { chars: ['a','b','c','d','e'] }
  const [inner, middle, outer] = [0,1,2]
  const getChar = (ring) => group.chars[ring] || group.chars[group.chars.length - 1]

  return (
    <div className="selectors">
      <button className="ring inner" onClick={() => onPick(getChar(inner))} title={`Inner: ${getChar(inner)}`}></button>
      <button className="ring middle" onClick={() => onPick(getChar(middle))} title={`Middle: ${getChar(middle)}`}></button>
      <button className="ring outer" onClick={() => onPick(getChar(outer))} title={`Outer: ${getChar(outer)}`}></button>
    </div>
  )
}
