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

// name -> tier. Combined entries ("Durg-Bhilai", "Osmanabad / Dharashiv", "Ch.Sambhajinagar (Aurangabad)") also match by each part.
const LOOKUP = (() => {
  const map = new Map()
  const add = (name, tier) => { const k = norm(name); if (k && !map.has(k)) map.set(k, tier) }
  for (const tier of [1, 2, 3]) {
    for (const entry of TIER_CITIES[tier]) {
      add(entry, tier)
      entry.split(/\s*[-/&()]\s*|\s+or\s+/i).forEach((p) => add(p, tier))
    }
  }
  // aliases point at a name already in the list
  for (const [alias, target] of Object.entries(ALIASES)) {
    const tier = map.get(norm(target))
    if (tier) add(alias, tier)
  }
  return map
})()
const NAMES_LONGEST_FIRST = [...LOOKUP.keys()].sort((a, b) => b.length - a.length)

// Tier (1 to 4) for a business. Tries the city, then the search area, then looks for any listed city in the address.
export function cityTier(...places) {
  for (const p of places) {
    const hit = LOOKUP.get(norm(p))
    if (hit) return hit
  }
  const text = ' ' + places.map(norm).join(' , ') + ' '
  for (const name of NAMES_LONGEST_FIRST) {
    if (text.includes(' ' + name + ' ')) return LOOKUP.get(name)
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
