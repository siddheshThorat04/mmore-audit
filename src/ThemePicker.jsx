import { useEffect, useRef, useState } from 'react'
import { PRESETS, DEFAULT_PRIMARY, applyTheme, checkBrand, getPrimary } from './theme.js'

// Header control: a swatch button that opens a small panel with preset colours,
// a colour wheel and a hex code box. Every change is applied to the whole app straight away.
export default function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [primary, setPrimary] = useState(getPrimary())
  const [text, setText] = useState(getPrimary())
  const [problem, setProblem] = useState('')
  const box = useRef(null)

  // stay in step if the colour is changed elsewhere (URL parameter, another picker)
  useEffect(() => {
    const on = (e) => { setPrimary(e.detail); setText(e.detail); setProblem('') }
    window.addEventListener('brandchange', on)
    return () => window.removeEventListener('brandchange', on)
  }, [])

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return
    const click = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', click)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', click); document.removeEventListener('keydown', key) }
  }, [open])

  const type = (value) => {
    setText(value)
    const r = checkBrand(value)
    if (r.ok) { setProblem(''); applyTheme(r.hex); return }
    const digits = value.trim().replace(/^#/, '')
    if (!/^[0-9a-f]*$/i.test(digits)) setProblem(r.reason)  // not a hex code
    else setProblem(r.hex ? r.reason : '')                   // complete but too pale, or still being typed
  }
  // leaving the box with half a code puts the last good colour back
  const leave = () => { if (!checkBrand(text).ok) { setText(primary); setProblem('') } }
  const pick = (hex) => { setProblem(''); applyTheme(hex) }

  return (
    <div className="tp no-print" ref={box}>
      <button type="button" className="tp-btn" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)}>
        <i className="tp-dot" style={{ background: primary }} aria-hidden="true" />
        <span>Colour</span>
      </button>
      {open && (
        <div className="tp-panel" role="dialog" aria-label="Choose brand colour">
          <div className="tp-title">Brand colour</div>
          <div className="tp-swatches">
            {PRESETS.map((c) => (
              <button type="button" key={c.hex} className={'tp-sw' + (primary === c.hex ? ' on' : '')} style={{ background: c.hex }}
                title={c.name} aria-label={c.name} aria-pressed={primary === c.hex} onClick={() => pick(c.hex)} />
            ))}
          </div>
          <div className="tp-row">
            <input type="color" className="tp-wheel" aria-label="Pick a colour" value={primary} onChange={(e) => pick(e.target.value)} />
            <input className="tp-hex" aria-label="Hex colour code" aria-invalid={Boolean(problem)} placeholder="#7c3aed" maxLength={7}
              spellCheck="false" autoComplete="off" value={text} onChange={(e) => type(e.target.value)} onBlur={leave} />
          </div>
          {problem && <p className="tp-err" role="alert">{problem}</p>}
          <button type="button" className="tp-reset" disabled={primary === DEFAULT_PRIMARY} onClick={() => pick(DEFAULT_PRIMARY)}>Reset to mmore.works red</button>
        </div>
      )}
    </div>
  )
}
