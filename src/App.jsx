import { useState } from 'react'
import { searchPlaces, getKeywords, runAudit } from './api.js'

const token = new URLSearchParams(window.location.search).get('t') || ''
const fmt = (n) => (n == null ? '\u2013' : n.toLocaleString('en-IN'))
const LOGO = 'https://ik.imagekit.io/p8bskkmqe/image_U0n_Ivvxn.png?updatedAt=1783403369073'
function PositionTrack({ position }) {
  if (!position) return <span className="miss">Not in top 10</span>
  const tone = position <= 3 ? 'good' : position <= 7 ? 'mid' : 'low'
  return (
    <span className="track" title={'Position ' + position}>
      {Array.from({ length: 10 }, (_, i) => <i key={i} className={i + 1 === position ? 'pin ' + tone : ''} />)}
      <b>#{position}</b>
    </span>
  )
}

function download(name, type, content) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type }))
  a.download = name
  a.click()
}
function exportCsv(a) {
  const q = (v) => '"' + String(v).replace(/"/g, '""') + '"'
  const rows = [['Search', 'Monthly searches', 'Competition', 'Maps position'],
  ...a.keywords.map((k) => [k.keyword, k.searches, k.competition, k.position ? '#' + k.position : 'Not in top 10']),
  [], ['Nearby business', 'Rating', 'Reviews'],
  ...a.competitors.map((c) => [c.name, c.rating, c.reviews])]
  download('google-audit.csv', 'text/csv', '\uFEFF' + rows.map((r) => r.map(q).join(',')).join('\n'))
}

export default function App() {
  const [step, setStep] = useState('find')
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
  const search = () => run(async () => setPlaces(await searchPlaces(query, token)))
  const choose = (p) => run(async () => {
    const r = await getKeywords(p.place_id, token)
    setChosen({ ...p, ...r.business }); setKeywords(r.keywords); setPicked(r.keywords); setStep('keywords')
  })
  const addKeyword = () => { const k = extra.trim().toLowerCase(); if (k && !keywords.includes(k)) { setKeywords([...keywords, k]); setPicked([...picked, k]) } setExtra('') }
  const generate = () => run(async () => { setAudit(await runAudit(chosen.place_id, picked, token)); setStep('report') })

  return (
    <main>
      <header className="top"><span className="logo">MmoreWorks</span><span className="note">Free Google audit</span></header>
      {error && <p className="error" role="alert">{error}</p>}

      {step === 'find' && (
        <section>
          <h1>See how your business shows up on Google</h1>
          <p className="lead">Find your business and we will show what people search for nearby, and where you appear.</p>
          <div className="row">
            <input aria-label="Business name and area" placeholder="Business name and area" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && query.trim() && search()} />
            <button disabled={busy || !query.trim()} onClick={search}>{busy ? 'Searching' : 'Find my business'}</button>
          </div>
          {places && (places.length ? (
            <ul className="list">{places.map((p) => (
              <li key={p.place_id}><button className="plain" onClick={() => choose(p)}><strong>{p.name}</strong><span>{p.address}</span></button></li>))}</ul>
          ) : <p className="lead">No match. Try adding your area, for example "Sharma Dental Andheri".</p>)}
        </section>
      )}

      {step === 'keywords' && (
        <section>
          <h1>What do your customers search for?</h1>
          <p className="lead"><strong>{chosen.name}</strong>, {chosen.address}. Keep the searches that matter to you, or add your own.</p>
          <div className="chips">{keywords.map((k) => (
            <label key={k} className={'chip' + (picked.includes(k) ? ' on' : '')}>
              <input type="checkbox" checked={picked.includes(k)} onChange={() => setPicked(picked.includes(k) ? picked.filter((x) => x !== k) : [...picked, k])} />{k}</label>))}</div>
          <div className="row">
            <input aria-label="Add a search" placeholder="Add a search, e.g. dental checkup" value={extra} onChange={(e) => setExtra(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addKeyword()} />
            <button className="ghost" onClick={addKeyword}>Add</button>
          </div>
          <div className="row end">
            <button className="ghost" onClick={() => setStep('find')}>Back</button>
            <button disabled={busy || !picked.length} onClick={generate}>{busy ? 'Checking Google...' : 'Create my audit'}</button>
          </div>
        </section>
      )}

      {step === 'report' && audit && (() => {
        const found = audit.keywords.filter((k) => k.position).length
        const total = audit.keywords.reduce((s, k) => s + (k.searches || 0), 0)
        return (
          <section>
            <h1>{audit.business.name}</h1>
            <div className="print-only print-head">
              <div className="brand">
                <img src={LOGO} alt="mmore.works" />
                <div><strong>mmore.works</strong><span>Google audit report</span></div>
              </div>
              <div className="meta">Prepared {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
            <p className="lead">You appear in the top 10 on Google Maps for <strong>{found} of {audit.keywords.length}</strong> searches. {audit.volumes_available === false
              ? <> Search volumes are temporarily unavailable, so only your positions are shown.</>
              : <> Together these searches happen about <strong>{fmt(total)} times a month</strong> in {audit.geo || audit.business.city}.</>}</p>
            <div className="actions no-print">
              <button onClick={() => window.print()}>Download PDF</button>
            </div>
            <h2>What people search for</h2>
            <div className="scroll"><table>
              <thead><tr><th>Search</th><th className="n">Per month</th><th>Competition</th><th>Your Maps position</th></tr></thead>
              <tbody>{audit.keywords.map((k) => (
                <tr key={k.keyword}><td>{k.keyword}</td><td className="n">{fmt(k.searches)}</td><td>{k.competition || '\u2013'}</td><td><PositionTrack position={k.position} /></td></tr>))}</tbody>
            </table></div>
            <h2>Businesses near you</h2>
            <div className="scroll"><table>
              <thead><tr><th>Business</th><th className="n">Rating</th><th className="n">Reviews</th></tr></thead>
              <tbody>{audit.competitors.map((c) => (
                <tr key={c.name} className={c.you ? 'you' : ''}><td>{c.name}{c.you && ' (you)'}</td><td className="n">{c.rating ?? '\u2013'}</td><td className="n">{c.reviews}</td></tr>))}</tbody>
            </table></div>
            <p className="fine">Search counts are Google estimates. Maps positions are an estimate of where you appear near your location and can vary by user.</p>
            <div className="print-only print-foot">
              <strong>Want to move up on Google?</strong> Message our team on WhatsApp at +91 83107 19532 or visit mmore.works.
            </div>
            <div className="cta no-print"><p>Want us to help you move up?</p><a href="https://wa.me/918310719532?text=I%20saw%20my%20audit">Message our team on WhatsApp</a></div>
          </section>
        )
      })()}
    </main>
  )
}
