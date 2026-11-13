// City tiers and the revenue estimate.
// City lists come from "List of Tier 1, 2 and 3 Cities". Any city not on the list is Tier 4.
//
// Revenue estimate (per month), from the revenue sheet:
//   Market size = total monthly searches x average ticket size
//   Low case (MinRev)        = lower of 10% of market size and R
//   Optimistic case (MaxRev) = lower of 35% of market size and 10 x R
// R is the reference monthly revenue for the city's tier.

export const TIER_CITIES = {
  1: [
  'Ahmedabad',
  'Bengaluru',
  'Chennai',
  'Gurgaon',
  'Hyderabad',
  'Kolkata',
  'Mumbai',
  'New Delhi',
  'Pune',
],
  2: [
  'Agra',
  'Ambala',
  'Amravati',
  'Amritsar',
  'Ananthapur',
  'Asansol',
  'Belagavi',
  'Bhavnagar',
  'Bhiwandi',
  'Bhopal',
  'Bhubaneswar',
  'Calicut',
  'Ch.Sambhajinagar (Aurangabad)',
  'Chandigarh',
  'Coimbatore',
  'Cuttack',
  'Davangere',
  'Dhanbad',
  'Durg-Bhilai',
  'Faridabad',
  'Gandhinagar',
  'Ghaziabad',
  'Goa',
  'Greater Noida',
  'Guntur',
  'Guwahati',
  'Gwalior',
  'Hisar',
  'Howrah-Hooghly',
  'Huballi & Dharwad',
  'Indore',
  'Jabalpur',
  'Jaipur',
  'Jalandhar',
  'Jalgaon',
  'Jamnagar',
  'Jamshedpur',
  'Jodhpur',
  'Kadapa',
  'Kakinada',
  'Kalyan Dombivli',
  'Kanpur',
  'Karnal',
  'Kochi',
  'Kolhapur',
  'Kota',
  'Kurnool',
  'Latur',
  'Lucknow',
  'Ludhiana',
  'Madurai',
  'Malegaon',
  'Mangaluru',
  'Mira Bhyander',
  'Mohali',
  'Moradabad',
  'Mysuru',
  'Nagpur',
  'Nanded',
  'Nashik',
  'Navi Mumbai',
  'Nellore',
  'Nizamabad',
  'Noida',
  'Panchkula',
  'Patna',
  'Prayagraj',
  'Puducherry',
  'Raipur',
  'Rajahmundry',
  'Rajkot',
  'Ranchi',
  'Rohtak',
  'Sagar',
  'Salem',
  'Sangli',
  'Satara',
  'Solapur',
  'Sonipat',
  'Surat',
  'Thane',
  'Thrissur',
  'Tirupathi',
  'Trichy',
  'Trivandrum',
  'Udaipur',
  'Vadodara',
  'Varanasi',
  'Vijayawada',
  'Vishakhapatnam',
  'Warangal',
  'Yamuna',
],
  3: [
  'Ahmednagar',
  'Akola',
  'Aligarh',
  'Alwar',
  'Amalner',
  'Ambajogai',
  'Amreli',
  'Anand',
  'Baramati',
  'Bardoli',
  'Barshi',
  'Bathinda',
  'Becharaji',
  'Beed',
  'Begusarai',
  'Berhampur',
  'Bhadradri Kothagudam',
  'Bhandara',
  'Bharatpur',
  'Bharuch',
  'Bhimavaram',
  'Bhusawal',
  'Bidar',
  'Bilaspur',
  'Buldhana',
  'Chalisgaon',
  'Chandrapur',
  'Chiplun',
  'Dahod',
  'Daund',
  'Dharmapuri',
  'Dhule',
  'Eluru',
  'Erode',
  'Gadhinglaj',
  'Gadwal',
  'Gandhidham',
  'Gaya',
  'Godhra',
  'Gondia',
  'Gurdaspur',
  'Hingoli',
  'Hoshangabad',
  'Hosur',
  'Ichalkaranji',
  'Indapur',
  'Islampur',
  'Jagityal',
  'Jalna',
  'Jaysingpur',
  'Jhansi',
  'Jharsuguda',
  'Junagadh',
  'Kachchh',
  'Kadi',
  'Kagal',
  'Kalol',
  'Kamareddy',
  'Karad',
  'Karim Nagar',
  'Karwar',
  'Khamgaon',
  'Khammam',
  'Kharar',
  'Kopargaon-Shirdi',
  'Machilipatnam',
  'Mahabubnagar',
  'Mahad',
  'Malvan',
  'Mancherial',
  'Mathura',
  'Mehsana',
  'Modasa',
  'Mundra',
  'Muzaffarpur',
  'Nadiad',
  'Nalgonda',
  'Nandyala',
  'Narsipatnam',
  'Navsari',
  'Nilanga',
  'Nirmal',
  'North Bengal',
  'Omerga',
  'Ongole',
  'Osmanabad / Dharashiv',
  'Ozar',
  'Pachora',
  'Palakkad',
  'Palakollu',
  'Palanpur',
  'Palghar Boisar',
  'Pandharpur',
  'Parbhani',
  'Patan',
  'Phaltan',
  'Pimpalgaon Baswant',
  'Puri',
  'Raigad',
  'Raigarh',
  'Ratnagiri',
  'Ropar',
  'Sabarkantha',
  'Sakri',
  'Sambalpur',
  'Sangrur',
  'Sawantwadi',
  'Shahada-Nandurbar',
  'Shahapur Murbad',
  'Shirpur',
  'Siddipet',
  'Silvassa',
  'Sindhudurg',
  'Sinnar',
  'Srikakulam',
  'Tirunelveli',
  'Tuni',
  'Udgir',
  'Udupi',
  'Ujjain',
  'Unjha',
  'Uran Dronagiri',
  'Valsad',
  'Vapi',
  'Vijapur',
  'Vijayapura',
  'Visnagar',
  'Vizianagaram',
  'Vyara',
  'Wanaparthy',
  'Wani',
  'Wardha',
  'Washim',
  'Yavatmal',
  'Zirakpur',
],
}

// Other common spellings and old names -> the name used in the list
const ALIASES = {
  gurugram: 'gurgaon', bangalore: 'bengaluru', 'bengaluru urban': 'bengaluru', bombay: 'mumbai', 'mumbai suburban': 'mumbai',
  delhi: 'new delhi', 'new delhi': 'new delhi', calcutta: 'kolkata', madras: 'chennai', poona: 'pune', secunderabad: 'hyderabad',
  thiruvananthapuram: 'trivandrum', kozhikode: 'calicut', cochin: 'kochi', ernakulam: 'kochi', visakhapatnam: 'vishakhapatnam', vizag: 'vishakhapatnam',
  tirupati: 'tirupathi', mysore: 'mysuru', mangalore: 'mangaluru', belgaum: 'belagavi', hubli: 'huballi', hubballi: 'huballi', dharwad: 'dharwad',
  aurangabad: 'aurangabad', 'chhatrapati sambhajinagar': 'aurangabad', 'sambhajinagar': 'aurangabad', allahabad: 'prayagraj', baroda: 'vadodara',
  tiruchirappalli: 'trichy', tiruchirapalli: 'trichy', panaji: 'goa', pondicherry: 'puducherry', bhilai: 'bhilai', durg: 'durg',
  dombivli: 'kalyan dombivli', kalyan: 'kalyan dombivli', bhayandar: 'mira bhyander', 'mira road': 'mira bhyander', kutch: 'kachchh',
  ahmadnagar: 'ahmednagar', karimnagar: 'karim nagar', dharashiv: 'dharashiv', 'new bombay': 'navi mumbai',
}

const norm = (s) => String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim()
// Combined entries ("Durg-Bhilai", "Osmanabad / Dharashiv", "Ch.Sambhajinagar (Aurangabad)") also match by each part.
const parts = (city) => city.split(/\s*[-/&()]\s*|\s+or\s+/i)

// The list as rows: { city, tier (1 to 3), aliases: [other spellings] }. This is the built-in copy;
// when a Google Sheet is configured (see "Tier sheet" below) the sheet replaces it.
export const DEFAULT_TIER_ROWS = (() => {
  const rows = []
  for (const tier of [1, 2, 3]) for (const city of TIER_CITIES[tier]) rows.push({ city, tier, aliases: [] })
  for (const [alias, target] of Object.entries(ALIASES)) {
    const t = norm(target)
    const row = rows.find((r) => norm(r.city) === t) || rows.find((r) => parts(r.city).some((p) => norm(p) === t))
    if (row && norm(alias) !== t) row.aliases.push(alias)
  }
  return rows
})()

// name -> tier lookup built from rows
function buildLookup(rows) {
  const map = new Map()
  const add = (name, tier) => { const k = norm(name); if (k && !map.has(k)) map.set(k, tier) }
  for (const r of rows) { add(r.city, r.tier); parts(r.city).forEach((p) => add(p, r.tier)) }
  // aliases go in after every real name, so a listed city always wins over an alias
  for (const r of rows) (r.aliases || []).forEach((a) => add(a, r.tier))
  return { map, names: [...map.keys()].sort((x, y) => y.length - x.length) }
}
let active = buildLookup(DEFAULT_TIER_ROWS)

// ---------------------------------------------------------------------------------------------
// Tier sheet: staff keep the list in a Google Sheet (columns: City | Tier | Also known as).
// Publish the sheet to the web as CSV and set VITE_TIERS_SHEET_CSV_URL to that link. Changes show up
// in the app within a few minutes, with no deploy. Without the variable, or if the sheet can't be
// read, the app uses the last good copy saved in the browser, then the built-in list above.
// ---------------------------------------------------------------------------------------------
const SHEET_URL = import.meta.env.VITE_TIERS_SHEET_CSV_URL
const CACHE_KEY = 'mmore_tiers_csv_v1'
const MIN_ROWS = 20 // a sheet with fewer valid cities than this is treated as a mistake and ignored
export let tierSource = 'built-in' // 'sheet' | 'saved copy' | 'built-in'

export function parseCsv(text) {
  const rows = []
  let row = [], cell = '', q = false
  const t = String(text || '').replace(/^\uFEFF/, '')
  for (let i = 0; i < t.length; i++) {
    const c = t[i]
    if (q) {
      if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++ } else q = false } else cell += c
    } else if (c === '"') q = true
    else if (c === ',') { row.push(cell); cell = '' }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(cell); cell = ''; rows.push(row); row = [] }
    else cell += c
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row) }
  return rows
}

export function rowsFromCsv(text) {
  const table = parseCsv(text)
  const head = (table[0] || []).map((h) => h.trim().toLowerCase())
  const ci = head.findIndex((h) => h.includes('city'))
  const ti = head.findIndex((h) => h.includes('tier'))
  const ai = head.findIndex((h) => h.includes('also') || h.includes('alias'))
  if (ci < 0 || ti < 0) return []
  const out = []
  for (const r of table.slice(1)) {
    const city = (r[ci] || '').trim()
    const m = String(r[ti] || '').match(/[1-3]/) // tier 4 is "not in the list", so only 1 to 3 are listed
    if (!city || !m) continue
    out.push({ city, tier: Number(m[0]), aliases: ai >= 0 ? String(r[ai] || '').split(/[,;|]/).map((x) => x.trim()).filter(Boolean) : [] })
  }
  return out
}

function apply(csv, source) {
  const rows = rowsFromCsv(csv)
  if (rows.length < MIN_ROWS) return false
  active = buildLookup(rows)
  tierSource = source
  return true
}

// last good copy from this browser: instant on the next visit, and works if the sheet is unreachable
try { if (SHEET_URL && typeof localStorage !== 'undefined') { const saved = localStorage.getItem(CACHE_KEY); if (saved) apply(saved, 'saved copy') } } catch (e) { /* ignore */ }

// Fetch the sheet. Returns true when the list changed, so the caller can refresh the screen.
export async function loadTierSheet() {
  if (!SHEET_URL) return false
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)
    const r = await fetch(SHEET_URL, { signal: ctrl.signal, cache: 'no-store' })
    clearTimeout(timer)
    if (!r.ok) throw new Error('HTTP ' + r.status)
    const text = await r.text()
    if (!apply(text, 'sheet')) { console.warn('Tier sheet ignored: it needs the columns City and Tier and at least ' + MIN_ROWS + ' cities.'); return false }
    try { localStorage.setItem(CACHE_KEY, text) } catch (e) { /* ignore */ }
    return true
  } catch (e) {
    console.warn('Could not read the tier sheet, using the ' + tierSource + ' list:', e && e.message)
    return false
  }
}

// Tier (1 to 4) for a business. Tries the city, then the search area, then looks for any listed city in the address.
export function cityTier(...places) {
  for (const p of places) {
    const hit = active.map.get(norm(p))
    if (hit) return hit
  }
  const text = ' ' + places.map(norm).join(' , ') + ' '
  for (const name of active.names) {
    if (text.includes(' ' + name + ' ')) return active.map.get(name)
  }
  return 4
}

export const SERVICES = {
  Dental: {
    ticket: 1000, // average ticket size, Rs per patient
    R: { 1: 25000, 2: 18000, 3: 13000, 4: 8750 }, // reference monthly revenue per tier
    tierPct: { 1: 1, 2: 0.7, 3: 0.5, 4: 0.35 }, // tier weight, for display
  },
}
export const MIN_SHARE = 0.1
export const MAX_SHARE = 0.35
export const MAX_R_MULTIPLE = 10

export function revenueEstimate(searches, tier, service = 'Dental') {
  const s = SERVICES[service]
  const R = s.R[tier]
  const market = searches * s.ticket
  return {
    tier, R, ticket: s.ticket, searches, market,
    min: Math.min(MIN_SHARE * market, R),
    max: Math.min(MAX_SHARE * market, MAX_R_MULTIPLE * R),
  }
}
