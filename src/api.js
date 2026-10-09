// Sample data by default. With VITE_USE_MOCK=false the app calls these Frappe API scripts
// (all take the lead token from the link: ?t=...):
//   audit_search_places {q, token}            -> [{place_id, name, address}]
//   audit_keywords      {place_id, token}     -> {business, keywords: ["..."]}
//   audit_run           {place_id, keywords, token} -> audit (same shape as MOCK_AUDIT)
const MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
async function call(method, body) {
  let r
  try {
    r = await fetch('/api/method/' + method, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  } catch (e) {
    throw new Error('Could not reach the server. Check your connection and try again.')
  }
  if (!r.ok) {
    // Frappe puts the readable reason in _server_messages (a JSON string of JSON strings)
    try {
      const j = await r.json()
      const msgs = JSON.parse(j._server_messages || '[]').map((m) => JSON.parse(m).message)
      if (msgs.length) throw new Error(msgs.join(' ').replace(/<[^>]+>/g, ''))
    } catch (e) { if (e.message && !/JSON|Unexpected/.test(e.message)) throw e }
    throw new Error('Something went wrong. Please try again.')
  }
  return (await r.json()).message
}
const MOCK_AUDIT = {
  business: { name: 'Smile Care Dental Clinic', address: 'Andheri West, Mumbai', category: 'Dentist', rating: 4.3, reviews: 58, city: 'Mumbai' },
  keywords: [
    { keyword: 'dentist in andheri west', searches: 2400, competition: 'High', position: 7 },
    { keyword: 'teeth whitening mumbai', searches: 1900, competition: 'Medium', position: 4 },
    { keyword: 'root canal treatment cost', searches: 3600, competition: 'High', position: null },
    { keyword: 'dental implants andheri', searches: 880, competition: 'Medium', position: 9 },
    { keyword: 'braces for adults mumbai', searches: 720, competition: 'Low', position: 2 },
    { keyword: 'emergency dentist near me', searches: 5400, competition: 'High', position: null },
  ],
  competitors: [
    { name: 'Apollo Dental Andheri', rating: 4.7, reviews: 412 },
    { name: 'Dental Studio Mumbai', rating: 4.6, reviews: 286 },
    { name: 'Smile Care Dental Clinic', rating: 4.3, reviews: 58, you: true },
    { name: 'City Dental Hub', rating: 4.1, reviews: 74 },
    { name: 'Andheri Family Dentistry', rating: 3.9, reviews: 31 },
  ],
}
export async function searchPlaces(q, token) {
  if (!MOCK) return call('audit_search_places', { q, token })
  await wait(500)
  return [
    { place_id: 'p1', name: 'Smile Care Dental Clinic', address: 'Andheri West, Mumbai' },
    { place_id: 'p2', name: 'Smile Care Dental Centre', address: 'Bandra East, Mumbai' },
    { place_id: 'p3', name: 'Smile Care Orthodontics', address: 'Powai, Mumbai' },
  ]
}
export async function getKeywords(place_id, token) {
  if (!MOCK) return call('audit_keywords', { place_id, token })
  await wait(600)
  return { business: MOCK_AUDIT.business, keywords: MOCK_AUDIT.keywords.map((k) => k.keyword) }
}
export async function runAudit(place_id, keywords, token) {
  if (!MOCK) return call('audit_run', { place_id, keywords, token })
  await wait(1400)
  return { ...MOCK_AUDIT, keywords: MOCK_AUDIT.keywords.filter((k) => keywords.includes(k.keyword)) }
}
