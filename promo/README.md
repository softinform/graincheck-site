# GrainCheck — Promo Assets

Reference visuals for marketing copywriting (Telegram posts, FB/IG ads, agro-media partner submissions, AI-generated content briefs).

These are the **real production screenshots** of the GrainCheck app — numbers visible on the screens are verified against unit tests and source code. Safe to cite in marketing copy.

## Files

| File | What's on it |
|---|---|
| `01-calculator-realistic.jpg` | **Raw screen** of Calculator with realistic batch: 200 t at 17%/4.8% humidity/impurity, base 14%/2%, storage 60 days, wheat price 7 750 ₴/t (market rate). Result: credited weight 187,390 t, weight loss 12,610 t (6.31%), active preset "З поля" with services 92 360 ₴ = **6.36% of revenue**, net revenue 1 359 912,50 ₴. With "GrainCheck" header added on top. **Note:** an older raw screen (`releases/screenshots/01-hero-analytics.png`) shows the same UI but with TEST-DATA price of 1 322 ₴/t — services look like 43.62% of revenue, which is nonsense (real elevator services are 5–15%). That old screen is **deprecated for marketing use**. |
| `02-form36-pdf.png` | PDF export adapted from Form № 36 (Ministry of Agrarian Policy of Ukraine) — operational register of grain quantity/quality used at elevators; serves as confirmation document between supplier and elevator, or as internal batch tracking. Not a bookkeeping form. |
| `03-prices-history.png` | Prices view — list of 6 default cultures with price history sparklines, supports physical/credited weight toggle, per-elevator filtering. |
| `06-formulas.png` | Duval formula breakdown — step-by-step transparency: each calculation step with number substitution, lets the user verify math cell-by-cell. |
| `app-icon-1024.png` | App icon (1024×1024) for thumbnails / favicons. |

## URLs (public, durable)

After commit + Netlify deploy:
- `https://graincheck.app/promo/01-calculator-realistic.jpg`
- `https://graincheck.app/promo/02-form36-pdf.png`
- `https://graincheck.app/promo/03-prices-history.png`
- `https://graincheck.app/promo/06-formulas.png`
- `https://graincheck.app/promo/app-icon-1024.png`

Alternative raw URLs (immediate, no Netlify wait):
- `https://raw.githubusercontent.com/softinform/graincheck-site/main/promo/<filename>`

## License

Marketing materials — © 2026 SoftInform LLC. Use permitted for editorial coverage, partner placements, and AI-generated content briefs about GrainCheck. Do not re-brand or composite into competitive product comparisons without permission.
