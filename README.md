# MmoreWorks audit app
Runs on built-in sample data by default. Open the page with `?t=anything` (the lead token goes there later).

Deploy (test): push this folder to GitHub, import in Vercel (framework: Vite). `vercel.json` already proxies `/api/*` to app.mmore.works, so no CORS setup is needed.
Render: create a Static Site (build `npm run build`, publish `dist`), then add rewrites in the dashboard: `/api/*` -> `https://app.mmore.works/api/:splat` (Rewrite), `/*` -> `/index.html` (Rewrite).

Going live: set env `VITE_USE_MOCK=false` and create the 3 Frappe API scripts described at the top of `src/api.js`.
Excel export is a CSV that opens in Excel; PDF uses the browser print dialog.

## City tiers from a Google Sheet
The Tier 1/2/3 city list lives in a Google Sheet so staff can edit it without a deploy.
1. Google Sheets -> File -> Import -> upload `tiers-template.csv` (it holds the current list). Columns: **City | Tier | Also known as**
   (Tier is 1, 2 or 3; a city not in the sheet is Tier 4; "Also known as" is a comma-separated list of other spellings).
2. File -> Share -> **Publish to web** -> pick the sheet tab and **Comma-separated values (.csv)** -> Publish. Copy the link.
3. In Vercel set `VITE_TIERS_SHEET_CSV_URL` to that link and redeploy (Vite reads it at build time, once).
4. From then on, edits in the sheet reach the app within a few minutes (Google refreshes published sheets about every 5 minutes).

Safety: if the sheet can't be read, the app uses the last good copy saved in the browser, then the built-in list. A sheet with
fewer than 20 valid cities (or without the City and Tier columns) is ignored. Only city names and tiers are published.
