// Cover page of the PDF (page 1): header on top, then a centred "Your Google Growth Audit" cover.
// Print only: .cover-page is hidden on screen. Business name and address come from the audit.

const G_LOGO = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
const COLORS = ['#4285f4', '#ea4335', '#fbbc05', '#4285f4', '#34a853', '#ea4335']

export default function CoverPage({ name, address, logo, date }) {
  return (
    <section className="cover-page" aria-hidden="true">
      <div className="print-head">
        <div className="brand">
          <img src={logo} alt="mmore.works" />
          <div><strong>mmore.works</strong><span>Google audit report</span></div>
        </div>
        <div className="meta">Prepared {date}</div>
      </div>
      <div className="cover-frame"><div className="cover-art">
        <div className="cover-bl" />

        <div className="cover-top">
          <div className="cover-brand">
            <img src={G_LOGO} alt="Google" />
            <span className="cover-divider" />
            <span className="cover-brand-text">Google Audit</span>
          </div>
        </div>

        <div className="cover-mid">
          <h1 className="cover-title">
            Your {'Google'.split('').map((ch, i) => <span key={i} style={{ color: COLORS[i] }}>{ch}</span>)}<br />Growth Audit
          </h1>
          <p className="cover-sub">A practical view of local patient demand, Google visibility and the revenue opportunity around your clinic.</p>
        </div>

        <div className="cover-card">
          <label>Prepared for</label>
          <strong>{name}</strong>
          {address && (
            <div className="cover-loc">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285f4" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
              <span>{address}</span>
            </div>
          )}
        </div>
      </div></div>
    </section>
  )
}
