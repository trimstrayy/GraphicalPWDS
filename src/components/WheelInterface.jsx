import React, { useMemo } from 'react'
import { characterGroups, rotateIndex } from '../utils/wheelLogic'
import { defaultPalette } from '../utils/colorUtils'
import CharacterSelector from './CharacterSelector'
import '../styles/wheel.css'

export default function WheelInterface({ color = defaultPalette[0], grouped, rotation, setRotation, onSelect }) {
  const groups = grouped || characterGroups
  const sectors = 8
  const anglePer = 360 / sectors

  const colors = useMemo(() => {
    const idx = defaultPalette.indexOf(color)
    if (idx < 0) return defaultPalette
    // Rotate palette so chosen color is at sector 0
    return Array.from({ length: sectors }, (_, i) => defaultPalette[rotateIndex(i + idx, sectors)])
  }, [color])

  const rotate = (dir) => setRotation(r => r + (dir === 'left' ? -anglePer : anglePer))

  return (
    <div className="wheel-container">
      <div className="controls">
        <button onClick={() => rotate('left')} aria-label="Rotate left">⟲</button>
        <button onClick={() => rotate('right')} aria-label="Rotate right">⟳</button>
      </div>
      <svg className="wheel" viewBox="-100 -100 200 200" aria-label="Graphical password wheel">
        {Array.from({ length: sectors }).map((_, i) => {
          const start = (i * anglePer + rotation) * Math.PI / 180
          const end = ((i + 1) * anglePer + rotation) * Math.PI / 180
          const x1 = 0 + 90 * Math.cos(start)
          const y1 = 0 + 90 * Math.sin(start)
          const x2 = 0 + 90 * Math.cos(end)
          const y2 = 0 + 90 * Math.sin(end)
          const largeArc = anglePer > 180 ? 1 : 0
          return (
            <path key={i}
              d={`M0,0 L${x1},${y1} A90,90 0 ${largeArc} 1 ${x2},${y2} Z`}
              fill={colors[i % colors.length]}
              stroke="#222"
              strokeWidth="0.5"
            />
          )
        })}
        {/* Character groups displayed as fixed labels around the wheel */}
        {groups.map((g, i) => {
          const ang = (i + 0.5) * anglePer
          const rad = ang * Math.PI / 180
          const x = 60 * Math.cos(rad)
          const y = 60 * Math.sin(rad)
          // Determine active group index: when rotation aligns chosen color (sector 0) to a group center
          const activeIndex = ((Math.round((-rotation) / anglePer) % sectors) + sectors) % sectors
          const isActive = activeIndex === i
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={isActive ? 8 : 6} fill={isActive ? '#fff' : '#9ca3af'}>
              {g.chars.join('')}
            </text>
          )
        })}
      </svg>
      {(() => {
        const activeIndex = ((Math.round((-rotation) / anglePer) % sectors) + sectors) % sectors
        const g = groups[activeIndex]
        return (
          <div className="selector-row">
            <div className="selector-card">
              <div className="group-label">Active Group ({activeIndex + 1})</div>
              <CharacterSelector group={g} onPick={onSelect} />
              <div className="hint">Select inner/middle/outer for this group's character</div>
            </div>
          </div>
        )
      })()}
      <div className="legend">Rotate the colored wheel so your color aligns with the group containing your desired character, then select inner/middle/outer to choose the character.</div>
    </div>
  )
}
