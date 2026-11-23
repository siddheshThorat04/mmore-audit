// Brand colour engine, shared by all three apps (audit, gbp-health, website-speed).
// Give it ONE hex code; it works out every shade the UI needs and writes them as CSS variables
// on <html>. Nothing else in the app needs to know which colour is chosen.
// This file has no framework code, so the same copy works in every app. Keep the copies identical.

export const DEFAULT_PRIMARY = '#e0142a' // mmore.works red
export const PRESETS = [
  { name: 'Red', hex: '#e0142a' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Purple', hex: '#7c3aed' },
  { name: 'Pink', hex: '#db2777' },
]

const STORE_KEY = 'brand_primary'
const URL_PARAM = 'brand' // e.g. ?brand=7c3aed lets you send a link that opens in that colour

// The default red keeps the exact shades the apps were designed with, so nothing changes
// for visitors who never pick a colour. Any other colour gets shades worked out from it.
const DEFAULT_SHADES = {
  'primary-dark': '#b80f22', 'primary-text': '#b80f22', 'primary-tint': '#fbdde0',
  'primary-soft': '#fdf1f1', 'primary-line': '#eee0e0', 'primary-edge': '#f6c9c9', 'primary-bright': '#ff8a96',
}

// ---------- colour maths ----------
// Accepts "#abc", "abc", "#aabbcc", "AABBCC" (spaces ignored). Returns "#rrggbb" or null.
export function normalizeHex(input) {
  let h = String(input == null ? '' : input).trim().replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map((c) => c + c).join('')
  return /^[0-9a-f]{6}$/i.test(h) ? '#' + h.toLowerCase() : null
}
const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const toHex = (rgb) => '#' + rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('')

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  if (max === min) return [0, 0, l * 100]
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [h * 60, s * 100, l * 100]
}
function hslToHex(h, s, l) {
  s = Math.min(100, Math.max(0, s)) / 100; l = Math.min(100, Math.max(0, l)) / 100
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return toHex([f(0) * 255, f(8) * 255, f(4) * 255])
}
function luminance(hex) {
  const [r, g, b] = toRgb(hex).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
// Darken a colour (keeping its hue) until it reads on the given background.
function readableOn(hex, bg, min = 4.5) {
  const [h, s, l0] = rgbToHsl(toRgb(hex))
  let l = l0, out = hex
  while (contrast(out, bg) < min && l > 4) { l -= 2; out = hslToHex(h, s, l) }
  return out
}

// A brand colour has to be visible on a white page. Pale colours (white, cream) are refused.
export function checkBrand(input) {
  const hex = normalizeHex(input)
  if (!hex) return { ok: false, hex: null, reason: 'Enter a hex colour like #7c3aed' }
  if (contrast(hex, '#ffffff') < 1.3) return { ok: false, hex, reason: 'That colour is too light to see on a white page' }
  return { ok: true, hex, reason: '' }
}

// hex -> every variable the stylesheet uses
export function deriveTheme(input) {
  const p = normalizeHex(input) || DEFAULT_PRIMARY
  const rgb = toRgb(p), [h, s, l] = rgbToHsl(rgb)
  const tint = hslToHex(h, Math.min(s, 85), 92)
  const derived = {
    primary: p,
    'primary-dark': hslToHex(h, s, l < 25 ? l + 10 : l * 0.82), // hover state
    'primary-tint': tint,                                        // soft backgrounds, pills, table headers
    'primary-soft': hslToHex(h, Math.min(s, 70), 96),
    'primary-line': hslToHex(h, Math.min(s, 25), 90),            // borders
    'primary-edge': hslToHex(h, Math.min(s, 70), 85),
    'primary-bright': hslToHex(h, s, Math.min(80, Math.max(l, 72))), // for use on dark backgrounds
    'primary-text': readableOn(p, tint),                         // text sitting on tinted backgrounds
    'primary-ink': readableOn(p, '#ffffff'),                     // text sitting on white
    'on-primary': contrast('#ffffff', p) >= contrast('#111111', p) ? '#ffffff' : '#111111', // text on a brand-coloured button
    'primary-rgb': rgb.join(', '),                               // for rgba(var(--primary-rgb), .4) glows
  }
  return p === DEFAULT_PRIMARY ? { ...derived, ...DEFAULT_SHADES } : derived
}

// ---------- apply / store ----------
let current = DEFAULT_PRIMARY
export const getPrimary = () => current

// Applies a colour to the page. Returns the normalised hex, or null if the input was not a valid colour.
export function applyTheme(input, { save = true } = {}) {
  const { ok, hex } = checkBrand(input)
  if (!ok) return null
  const vars = deriveTheme(hex), root = document.documentElement
  Object.keys(vars).forEach((k) => root.style.setProperty('--' + k, vars[k]))
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', hex)
  current = hex
  if (save) { try { hex === DEFAULT_PRIMARY ? localStorage.removeItem(STORE_KEY) : localStorage.setItem(STORE_KEY, hex) } catch (e) { /* private mode: still applied for this visit */ } }
  window.dispatchEvent(new CustomEvent('brandchange', { detail: hex }))
  return hex
}

// Call once before the app renders: ?brand=7c3aed wins, then the saved colour, then the default.
export function initTheme() {
  let wanted = null
  try { wanted = new URLSearchParams(window.location.search).get(URL_PARAM) } catch (e) { /* ignore */ }
  let fromUrl = checkBrand(wanted).ok
  if (!fromUrl) { try { wanted = localStorage.getItem(STORE_KEY) } catch (e) { wanted = null } }
  return applyTheme(wanted || DEFAULT_PRIMARY, { save: fromUrl }) || applyTheme(DEFAULT_PRIMARY, { save: false })
}
