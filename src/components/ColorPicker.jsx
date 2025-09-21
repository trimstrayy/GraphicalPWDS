import React from 'react'
import { defaultPalette } from '../utils/colorUtils'

export default function ColorPicker({ color, setColor }) {
  return (
    <div className="card">
      <label>Choose your personal color</label>
      <div className="palette">
        {defaultPalette.map(c => (
          <button key={c} className={`swatch ${c === color ? 'active' : ''}`} style={{ background: c }} onClick={() => setColor(c)} aria-label={`Choose color ${c}`}></button>
        ))}
      </div>
    </div>
  )
}
