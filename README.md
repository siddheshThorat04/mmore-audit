# MmoreWorks audit app
Runs on built-in sample data by default. Open the page with `?t=anything` (the lead token goes there later).

Deploy (test): push this folder to GitHub, import in Vercel (framework: Vite). `vercel.json` already proxies `/api/*` to app.mmore.works, so no CORS setup is needed.
Render: create a Static Site (build `npm run build`, publish `dist`), then add rewrites in the dashboard: `/api/*` -> `https://app.mmore.works/api/:splat` (Rewrite), `/*` -> `/index.html` (Rewrite).

Going live: set env `VITE_USE_MOCK=false` and create the 3 Frappe API scripts described at the top of `src/api.js`.
Excel export is a CSV that opens in Excel; PDF uses the browser print dialog.
