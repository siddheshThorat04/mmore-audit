import assert from 'node:assert/strict'
import { normalizeHex, deriveTheme, checkBrand, contrast, PRESETS, DEFAULT_PRIMARY } from '../src/theme.js'

assert.equal(normalizeHex('7C3AED'), '#7c3aed'); assert.equal(normalizeHex('#abc'), '#aabbcc'); assert.equal(normalizeHex(' #FACC15 '), '#facc15')
for (const bad of ['', 'xyz', '#12', '#12345', '#1234567', null, undefined, '#gggggg']) assert.equal(normalizeHex(bad), null, String(bad))
assert.equal(checkBrand('#ffffff').ok, false, 'white is refused'); assert.equal(checkBrand('#fffbe6').ok, false, 'cream is refused')
for (const ok of ['#facc15', '#000000', '#101012']) assert.equal(checkBrand(ok).ok, true, ok)

// default red: exact original shades
const d = deriveTheme(DEFAULT_PRIMARY)
assert.equal(d['primary-dark'], '#b80f22'); assert.equal(d['primary-tint'], '#fbdde0'); assert.equal(d['on-primary'], '#ffffff'); assert.equal(d['primary-ink'], '#e0142a')
assert.notEqual(deriveTheme('#e0142b')['primary-text'], undefined)

// every preset and a spread of random colours must give readable text
const tests = [...PRESETS.map((p) => p.hex), '#000000', '#101012', '#808080', '#00ff00', '#ffff00', '#00ffff', '#ff00ff', '#0000ff', '#ff0000']
let worst = 99
for (const hex of tests) {
  const t = deriveTheme(hex)
  const checks = [
    ['text on tint', contrast(t['primary-text'], t['primary-tint'])],
    ['ink on white', contrast(t['primary-ink'], '#ffffff')],
    ['label on brand button', contrast(t['on-primary'], t.primary)],
  ]
  for (const [name, v] of checks) { worst = Math.min(worst, v); assert(v >= 3.9, hex + ' ' + name + ' ' + v.toFixed(2)) }
  for (const k of Object.keys(t)) assert(k === 'primary-rgb' || /^#[0-9a-f]{6}$/.test(t[k]), hex + ' ' + k + ' ' + t[k])
}
console.log('Theme checks passed for ' + tests.length + ' colours. Lowest contrast seen: ' + worst.toFixed(2))
