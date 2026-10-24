import { useEffect, useRef, useState } from 'react'
import { searchPlaces, getKeywords, runAudit } from './api.js'
import { loadMaps, mapsAvailable } from './maps.js'

const fmt = (n) => (n == null ? '\u2013' : n.toLocaleString('en-IN'))
const LOGO = 'https://ik.imagekit.io/p8bskkmqe/image_U0n_Ivvxn.png?updatedAt=1783403369073'
const G_LOGO = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
const G_LOGO_2X = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
const WA_NUMBER = '918310719532'
const waLink = (text) => 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text)

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41" />
    </svg>
  )
}

// function PositionTrack({ position }) {
//   if (!position) return <span className="miss">Not in top 10</span>
//   const tone = position <= 3 ? 'good' : position <= 7 ? 'mid' : 'low'
//   return (
//     <span className="track" title={'Position ' + position}>
//       {Array.from({ length: 10 }, (_, i) => <i key={i} className={i + 1 === position ? 'pin ' + tone : ''} />)}
//       <b>#{position}</b>
//     </span>
//   )
// }


function RankBadge({ position }) {
  // Beyond the top 10 (or not found): shown as +#10. Each tier has its own colour.
  if (!position) return <span className="rank out" title="Not in the top 10">+#10</span>
  const tier = position === 1 ? 'first' : position <= 3 ? 'top' : position <= 6 ? 'mid' : 'low'
  return <span className={'rank ' + tier} title={'Position ' + position}>#{position}</span>
}
// Google's search-as-you-type box, the same widget the Business form in Frappe uses.
function PlaceSearch({ onPick, onFail }) {
  const host = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let dead = false
    let el = null
    loadMaps()
      .then(async (g) => {
        const { PlaceAutocompleteElement } = await g.maps.importLibrary('places')
        if (dead || !host.current) return
        el = new PlaceAutocompleteElement({ includedRegionCodes: ['in'] })
        el.style.width = '100%'
        el.style.colorScheme = 'light'
        host.current.replaceChildren(el)
        const onSelect = async (event) => {
          const pred = event.placePrediction
          try {
            if (pred) {
              // fetching just the id ends Google's billing session (id-only is free)
              try { await pred.toPlace().fetchFields({ fields: ['id'] }) } catch (e) { /* not needed */ }
              onPick({ place_id: pred.placeId, name: pred.mainText ? pred.mainText.text : '', address: pred.secondaryText ? pred.secondaryText.text : '' })
            } else if (event.place) {
              await event.place.fetchFields({ fields: ['displayName', 'formattedAddress'] })
              onPick({ place_id: event.place.id, name: event.place.displayName, address: event.place.formattedAddress })
            }
          } catch (e) { onFail() }
        }
        el.addEventListener('gmp-select', onSelect)
        el.addEventListener('gmp-placeselect', onSelect)
        setReady(true)
      })
      .catch(() => { if (!dead) onFail() })
    return () => { dead = true; if (el) el.remove() }
  }, [])
  return <div className="combo">{!ready && <span className="miss">Loading search...</span>}<div ref={host} /></div>
}

// Map for the report: the business pin plus a shaded area showing where positions were checked.
// function BusinessMap({ business }) {
//   const ref = useRef(null)
//   const [ok, setOk] = useState(Boolean(business.lat && business.lng) && mapsAvailable())
//   useEffect(() => {
//     if (!ok) return
//     let dead = false
//     loadMaps()
//       .then(async (g) => {
//         const { Map, Circle } = await g.maps.importLibrary('maps')
//         const { AdvancedMarkerElement } = await g.maps.importLibrary('marker')
//         if (dead || !ref.current) return
//         const pos = { lat: Number(business.lat), lng: Number(business.lng) }
//         const map = new Map(ref.current, { center: pos, zoom: 14, mapId: 'DEMO_MAP_ID', disableDefaultUI: true, zoomControl: true, gestureHandling: 'cooperative', clickableIcons: false })
//         const pin = document.createElement('div')
//         pin.className = 'pin-you'
//         new AdvancedMarkerElement({ map, position: pos, content: pin, title: business.name })
//         new Circle({ map, center: pos, radius: 5000, strokeColor: '#e63946', strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#e63946', fillOpacity: 0.06 })
//       })
//       .catch(() => { if (!dead) setOk(false) })
//     return () => { dead = true }
//   }, [])
//   if (!ok) return null
//   return (
//     <div className="map-wrap no-print">
//       <div className="map" ref={ref} />
//       <div className="map-card"><strong>{business.name}</strong><span>{business.address}</span></div>
//       <div className="map-note">Shaded area: where we checked your Maps position</div>
//     </div>
//   )
// }
// Map for the report: you (red pin) and the competitors from the table (numbered).
function BusinessMap({ business, competitors = [] }) {
  const ref = useRef(null)
  const [ok, setOk] = useState(Boolean(business.lat && business.lng) && mapsAvailable())
  useEffect(() => {
    if (!ok) return
    let dead = false
    loadMaps()
      .then(async (g) => {
        const { Map } = await g.maps.importLibrary('maps')
        const { LatLngBounds } = await g.maps.importLibrary('core')
        const { AdvancedMarkerElement } = await g.maps.importLibrary('marker')
        if (dead || !ref.current) return
        const pos = { lat: Number(business.lat), lng: Number(business.lng) }
        const map = new Map(ref.current, { center: pos, zoom: 14, mapId: 'DEMO_MAP_ID', disableDefaultUI: true, zoomControl: true, gestureHandling: 'cooperative', clickableIcons: false })
        const bounds = new LatLngBounds()
        bounds.extend(pos)
        let others = 0
        competitors.forEach((c) => {
          if (c.you || c.lat == null || c.lng == null) return
          const p = { lat: Number(c.lat), lng: Number(c.lng) }
          const el = document.createElement('div')
          el.className = 'pin-comp'
          el.textContent = String(c.n)
          new AdvancedMarkerElement({ map, position: p, content: el, title: c.name })
          bounds.extend(p)
          others += 1
        })
        const pin = document.createElement('div')
        pin.className = 'pin-you'
        new AdvancedMarkerElement({ map, position: pos, content: pin, title: business.name, zIndex: 10 })
        if (others > 0) map.fitBounds(bounds, 56)
      })
      .catch(() => { if (!dead) setOk(false) })
    return () => { dead = true }
  }, [])
  if (!ok) return null
  return (
    <div className="map-wrap no-print">
      <div className="map" ref={ref} />
      <div className="map-card"><strong>{business.name}</strong><span>{business.address}</span></div>
      <div className="map-note">Red pin: you. Numbers match the competitors table below</div>
    </div>
  )
}

// Numbers only the competitors (not "you"), so the map pins and the table agree.
function numberCompetitors(list) {
  let n = 0
  return (list || []).map((c) => (c.you ? { ...c, n: null } : { ...c, n: ++n }))
}
// The browser names the saved PDF after the page title, so set it just for printing.
function printReport(businessName) {
  const previous = document.title
  document.title = 'Google audit - ' + businessName
  window.print()
  document.title = previous
}

export default function App() {
  const [step, setStep] = useState('find')
  const [mode, setMode] = useState(mapsAvailable() ? 'widget' : 'manual')
  const [query, setQuery] = useState('')
  const [places, setPlaces] = useState(null)
  const [chosen, setChosen] = useState(null)
  const [keywords, setKeywords] = useState([])
  const [picked, setPicked] = useState([])
  const [extra, setExtra] = useState('')
  const [audit, setAudit] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const run = async (fn) => { setBusy(true); setError(''); try { await fn() } catch (e) { setError(e.message) } setBusy(false) }
  const search = () => run(async () => setPlaces(await searchPlaces(query)))
  const choose = (p) => run(async () => {
    const r = await getKeywords(p.place_id)
    setChosen({ ...p, ...r.business }); setKeywords(r.keywords); setPicked(r.keywords); setPlaces(null); setStep('keywords')
  })
  const addKeyword = () => { const k = extra.trim().toLowerCase(); if (k && !keywords.includes(k)) { setKeywords([...keywords, k]); setPicked([...picked, k]) } setExtra('') }
  const generate = () => run(async () => { setAudit(await runAudit(chosen.place_id, picked)); setStep('report') })

  // The WhatsApp message changes with where the visitor is, so your team knows the context.
  const waText = step === 'report' && audit
    ? 'Hi, I saw my Google audit for ' + audit.business.name + '.'
    : step === 'keywords' && chosen
      ? "Hi, I'm doing the Google audit for " + chosen.name + ' and have a question.'
      : 'Hi, I have a question about the free Google audit.'

  return (
    <main>
      <header className="top">
        <div className="brand">
          <img src={LOGO} alt="mmore.works" className="logo-img" />
          <div><div className="wordmark">mmore.works</div><div className="sub">Free Google audit</div></div>
        </div>
        <span className="pill">{step === 'find' ? 'Step 1 of 3' : step === 'keywords' ? 'Step 2 of 3' : 'Your report'}</span>
      </header>
      {error && <p className="error" role="alert">{error}</p>}

      {step === 'find' && (
        <section>
          <img src={LOGO} alt="mmore.works" className="landing-logo" />
          <h1>See how your business shows up on <img className="g-logo" alt="Google" src={G_LOGO} srcSet={G_LOGO + ' 1x, ' + G_LOGO_2X + ' 2x'} /></h1>
          <p className="lead">Start typing your business name and we will show what people search for nearby, and where you appear.</p>

          {mode === 'widget' ? (
            <div className="search-card"><PlaceSearch onPick={choose} onFail={() => setMode('manual')} /></div>
          ) : (
            <div className="row">
              <input aria-label="Business name and area" placeholder="Business name and area" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && query.trim() && search()} />
              <button disabled={busy || !query.trim()} onClick={search}>{busy ? 'Searching' : 'Find my business'}</button>
            </div>
          )}
          {busy && mode === 'widget' && <p className="miss">Loading your business...</p>}
          {mapsAvailable() && (
            <button className="linklike" onClick={() => setMode(mode === 'widget' ? 'manual' : 'widget')}>
              {mode === 'widget' ? "Can't find it? Search by name instead" : 'Back to suggestions as you type'}
            </button>
          )}

          {mode === 'manual' && places && (places.length ? (
            <ul className="list">{places.map((p) => (
              <li key={p.place_id}><button className="plain" onClick={() => choose(p)}><strong>{p.name}</strong><span>{p.address}</span></button></li>))}</ul>
          ) : <p className="lead">No match. Try adding your area, for example "Sharma Dental Andheri".</p>)}
        </section>
      )}

      {step === 'keywords' && (
        <section>
          <h1>What do your customers search for?</h1>
          <p className="lead"><strong>{chosen.name}</strong>, {chosen.address}. Keep the searches that matter to you (red), or add your own.</p>
          <div className="chips">{keywords.map((k) => (
            <label key={k} className={'chip' + (picked.includes(k) ? ' on' : '')}>
              <input type="checkbox" checked={picked.includes(k)} onChange={() => setPicked(picked.includes(k) ? picked.filter((x) => x !== k) : [...picked, k])} />{k}</label>))}</div>
          <div className="row">
            <input aria-label="Add a search" placeholder="Add a search, e.g. dental checkup" value={extra} onChange={(e) => setExtra(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addKeyword()} />
            <button className="ghost" onClick={addKeyword}>Add</button>
          </div>
          <div className="row end">
            <button className="ghost" onClick={() => { setStep('find'); setMode(mapsAvailable() ? 'widget' : 'manual') }}>Back</button>
            <button disabled={busy || !picked.length} onClick={generate}>{busy ? 'Checking Google...' : 'Create my audit'}</button>
          </div>
        </section>
      )}

      {step === 'report' && audit && (() => {
        const found = audit.keywords.filter((k) => k.position).length
        const total = audit.keywords.reduce((s, k) => s + (k.searches || 0), 0)
        const mapBusiness = { ...audit.business, lat: chosen && chosen.lat, lng: chosen && chosen.lng, address: (chosen && chosen.address) || audit.business.address }
        const numbered = numberCompetitors(audit.competitors)
        return (
          <section>
            <div className="print-only print-head">
              <div className="brand">
                <img src={LOGO} alt="mmore.works" />
                <div><strong>mmore.works</strong><span>Google audit report</span></div>
              </div>
              <div className="meta">Prepared {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>

            <div className="hero">
              <div className="hero-info">
                <h1>{audit.business.name}</h1>
                <p className="lead">You appear in the top 10 on Google Maps for <strong>{found} of {audit.keywords.length}</strong> searches. {audit.volumes_available === false
                  ? <> Search volumes are temporarily unavailable, so only your positions are shown.</>
                  : <> Together these searches happen about <strong>{fmt(total)} times a month</strong> in {audit.geo || audit.business.city}.</>}</p>
                <div className="stats">
                  <div className="stat"><label>Top 10 on Maps</label><b>{found} of {audit.keywords.length}</b><span>searches</span></div>
                  <div className="stat"><label>Searches a month</label><b>{audit.volumes_available === false ? '\u2013' : fmt(total)}</b><span>in {audit.geo || audit.business.city}</span></div>
                  <div className="stat"><label>Your rating</label><b>{audit.business.rating ?? '\u2013'}</b><span>{fmt(audit.business.reviews)} reviews</span></div>
                </div>
                <div className="actions no-print">
                  <button onClick={() => printReport(audit.business.name)}>Download PDF</button>
                </div>
              </div>
              <BusinessMap business={mapBusiness} competitors={numbered} />
            </div>

            <h2>What people search for</h2>
            <div className="scroll"><table>
              <thead><tr><th>Search</th><th className="n">Per month</th><th>Competition</th><th>Your Maps position</th></tr></thead>
              <tbody>{audit.keywords.map((k) => (
                <tr key={k.keyword}><td>{k.keyword}</td><td className="n">{fmt(k.searches)}</td><td>{k.competition || '\u2013'}</td><td><RankBadge position={k.position} /></td></tr>))}</tbody>
            </table></div>

            <h2>Competitors</h2>
            {audit.competitor_radius_km ? <p className="fine">Businesses of the same kind within about {audit.competitor_radius_km} km of you.</p> : null}
            <div className="scroll"><table>
              <thead><tr><th>Competitor</th><th className="n">Rating</th><th className="n">Reviews</th></tr></thead>
              {/* <tbody>{audit.competitors.map((c) => (
                <tr key={c.name} className={c.you ? 'you' : ''}><td>{c.name}{c.you && ' (you)'}</td><td className="n">{c.rating ?? '\u2013'}</td><td className="n">{c.reviews}</td></tr>))}</tbody> */}
              <tbody>{numbered.map((c) => (
                <tr key={c.name} className={c.you ? 'you' : ''}><td><span className={'num' + (c.you ? ' you-dot' : '')}>{c.n}</span>{c.name}{c.you && ' (you)'}</td><td className="n">{c.rating ?? '\u2013'}</td><td className="n">{c.reviews}</td></tr>))}</tbody>
            </table></div>
            <p className="fine">Search counts are Google estimates. Maps positions are an estimate of where you appear near your location and can vary by user.</p>

            <div className="print-only print-foot">
              <strong>Want to move up on Google?</strong> Message our team on WhatsApp at +91 83107 19532 or visit mmore.works.
            </div>
            <div className="cta no-print">
              <p>Want us to help you move up?</p>
              <a className="wa" href={waLink('Hi, I saw my Google audit for ' + audit.business.name + '.')} target="_blank" rel="noreferrer"><WhatsAppIcon /> Message our team on WhatsApp</a>
            </div>
          </section>
        )
      })()}

      <footer className="foot no-print">Powered by <strong>mmore.works</strong> · Search counts and Maps positions are Google estimates</footer>

      <a className="wa-fab no-print" href={waLink(waText)} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
        <WhatsAppIcon size={28} /><span>Chat with us</span>
      </a>
    </main>
  )
}