import React, { useMemo } from 'react'
import { characterGroups, rotateIndex, alignedGroupIndex } from '../utils/wheelLogic'
import { defaultPalette } from '../utils/colorUtils'
import CharacterSelector from './CharacterSelector'
import '../styles/wheel.css'

export default function WheelInterface({ color = defaultPalette[0], grouped, rotation, setRotation, onSelect }) {
  const groups = grouped || characterGroups
  const sectors = 12
  const anglePer = 360 / sectors

  const colors = useMemo(() => {
    const idx = defaultPalette.indexOf(color)
    const base = idx < 0 ? 0 : idx
    // Repeat palette around the ring; align chosen color at sector 0
    return Array.from({ length: sectors }, (_, i) => defaultPalette[rotateIndex(i + base, defaultPalette.length)])
  }, [color])

  const rotate = (dir) => setRotation(r => r + (dir === 'left' ? -anglePer : anglePer))

  return (
    <div className="wheel-container">
      <div className="controls">
        <button onClick={() => rotate('left')} aria-label="Rotate left">⟲</button>
        <button onClick={() => rotate('right')} aria-label="Rotate right">⟳</button>
      </div>
      <svg className="wheel" viewBox="-100 -100 200 200" aria-label="Graphical password wheel">
        {/* Outer colored ring */}
        {Array.from({ length: sectors }).map((_, i) => {
          const start = (i * anglePer + rotation) * Math.PI / 180
          const end = ((i + 1) * anglePer + rotation) * Math.PI / 180
          const rOuter = 90
          const rInner = 75
          const x1o = rOuter * Math.cos(start), y1o = rOuter * Math.sin(start)
          const x2o = rOuter * Math.cos(end),   y2o = rOuter * Math.sin(end)
          const x1i = rInner * Math.cos(start), y1i = rInner * Math.sin(start)
          const x2i = rInner * Math.cos(end),   y2i = rInner * Math.sin(end)
          const largeArc = anglePer > 180 ? 1 : 0
          const d = `M ${x1i},${y1i} L ${x1o},${y1o} A ${rOuter},${rOuter} 0 ${largeArc} 1 ${x2o},${y2o} L ${x2i},${y2i} A ${rInner},${rInner} 0 ${largeArc} 0 ${x1i},${y1i} Z`
          return (
            <path key={i} d={d} fill={colors[i % colors.length]} stroke="#222" strokeWidth="0.5" />
          )
        })}
        {/* Character groups displayed as fixed labels around the wheel */}
        {groups.map((g, i) => {
          const ang = (i + 0.5) * anglePer
          const rad = ang * Math.PI / 180
          const x = 0 + 55 * Math.cos(rad)
          const y = 0 + 55 * Math.sin(rad)
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={6} fill={'#9ca3af'}>
              {g.chars.join('')}
            </text>
          )
        })}
      </svg>
      {(() => {
        // The color at sector 0 is our chosen color; when rotation is such that
        // sector 0 overlaps group index k, we allow selection in group k.
        const alignedGroup = alignedGroupIndex(rotation, sectors)
        const g = groups[alignedGroup]
        return (
          <div className="selector-row">
            <div className="selector-card">
              <div className="group-label">Aligned Group ({alignedGroup + 1})</div>
              <CharacterSelector group={g} onPick={onSelect} />
              <div className="hint">Rotate until your color sits on the desired group, then pick inner/middle/outer.</div>
            </div>
          </div>
        )
      })()}
      <div className="legend">Rotate the colored wheel so your color aligns with the group containing your desired character, then select inner/middle/outer to choose the character.</div>
    </div>
  )
}
