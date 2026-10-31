// The two FAQ pages of the PDF (pages 4 and 5). Print only: .print-pages is hidden on screen.
// Built from FAQ_s.docx and FAQ-1.docx. "Is there a mobile app?" and "What if I need help?"
// were in both files, so each appears once. Edit the text here.

const PAGE_1 = [
  {
    q: 'How is Mmore.Works better than other marketing agencies?',
    a: <>Unlike a traditional marketing agency, it is an AI-based online platform that puts you in direct control of your marketing. Its AI agents automatically optimise your Google visibility, improve ranking for search keywords and help with Google review management. Overall: more customer bookings in significantly less time and money.</>,
  },
  {
    q: 'Can I run Google Ads?',
    a: <>Yes. The platform lets you run Google Ads in just 2 to 3 clicks. All the technical heavy lifting, such as keyword selection, landing page, conversion tracking and optimisation, is taken care of by AI agents. You only provide the business decisions, such as the ad budget and duration.</>,
  },
  {
    q: 'Do I need any technical or marketing experience?',
    a: <>Not at all. Our team and AI agents help with setup, execution and support.</>,
  },
  {
    q: 'What are the platform subscription charges?',
    a: <>Currently there are 3 plans for India: <strong>Growth Plus</strong> (Rs 2,999/month), <strong>Growth</strong> (Rs 1,999/month) and <strong>Starter</strong> (Rs 999/month), all tax exclusive. Free trial. Cancel anytime. No hidden fee.</>,
  },
  {
    q: 'Tell me about your company.',
    a: <>Mmore.Works is a new initiative backed by Acumensa Tech Pvt Ltd (2017), headquartered in Bangalore. The promoters bring extensive hands-on experience working primarily in the USA with Fortune 500 brands.</>,
  },
  {
    q: 'How quickly can I start seeing results?',
    a: <>Review requests and ranking fixes start working from day one. Most businesses start seeing bookings within 8 to 12 weeks, and even faster when running ads.</>,
  },
  {
    q: 'Besides Google, do you help with any other platform?',
    a: <>Currently our focus is Google, both for demand capture (high-intent leads from Google) and demand generation (YouTube). In the near future, the scope of our solution will expand to other social media platforms.</>,
  },
]

const PAGE_2 = [
  {
    q: 'I want to get started. What are the next steps?',
    a: <>Congratulations on choosing the latest in innovation for your business growth. Sign up at <a href="https://app.mmore.works" target="_blank" rel="noreferrer">https://app.mmore.works</a>. If you need any help, reach our support team on WhatsApp at <strong>+91 89718 87843</strong> (Mon to Fri, 10 AM to 7 PM).</>,
  },
  {
    q: 'Are there any documents to help with onboarding and execution?',
    a: <>Yes. Helpful videos are available, and a few more are work in progress. Please reach out to the support team for reference.</>,
  },
  {
    q: 'Is there any other solution apart from organic and paid visibility?',
    a: <>Yes. We can help with integrated solutions for website, CRM and appointments, at very reasonable rates communicated in advance.</>,
  },
  {
    q: 'Can I generate my Google audit report for free myself?',
    a: <>Yes. Visit <a href="https://audit.mmore.works" target="_blank" rel="noreferrer">https://audit.mmore.works</a>.</>,
  },
  {
    q: 'Is there a mobile app?',
    a: <>There is no app to install. You get a simple dashboard plus text and email alerts.</>,
  },
  {
    q: 'What if I need help?',
    a: <>A real person is one message away. Every account gets a dedicated growth lead.</>,
  },
]

function FaqPage({ logo, items, part }) {
  return (
    <section className="faq-page">
      <div className="print-head">
        <div className="brand">
          <img src={logo} alt="mmore.works" />
          <div><strong>mmore.works</strong><span>Google audit report</span></div>
        </div>
        <div className="meta">FAQ, page {part} of 2</div>
      </div>
      <h1>Frequently asked questions</h1>
      <div className="faq-list">
        {items.map((f) => (
          <div className="faq-item" key={f.q}>
            <h3><span className="faq-q">Q</span>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function FaqPages({ logo }) {
  return (
    <>
      <FaqPage logo={logo} items={PAGE_1} part={1} />
      <FaqPage logo={logo} items={PAGE_2} part={2} />
    </>
  )
}