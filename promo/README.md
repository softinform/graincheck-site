# GrainCheck — Promo Assets

Reference visuals for marketing copywriting (Telegram posts, FB/IG ads, agro-media partner submissions, AI-generated content briefs).

These are the **real production screenshots** of the GrainCheck app — numbers visible on the screens are verified against unit tests and source code. Safe to cite in marketing copy.

## Files

| File | What's on it |
|---|---|
| `01-calculator-realistic.png` | Branded composite (1080×1080) showing Calculator result with **realistic numbers**: wheat price ~7 500 ₴/t (current market rate), services share **~6.5%** of revenue, net revenue ~1.46 mln ₴ for a typical batch. **This is an FB-ad composite, not a raw screen** — frame and tagline are baked in. Note: an older raw screen (`releases/screenshots/01-hero-analytics.png`) shows the same Calculator UI but with a TEST-DATA price of 1 322 ₴/t — which makes services look like 43.62% of revenue. That's nonsense in real-world (services are typically 5–15%), so the old raw screen is **deprecated for marketing use**. Use this composite instead, OR generate a fresh raw screen with realistic input. |
| `02-form36-pdf.png` | PDF export adapted from Form № 36 (Ministry of Agrarian Policy of Ukraine) — accounting register of grain quantity/quality, ready to submit to bookkeeping. |
| `03-prices-history.png` | Prices view — list of 6 default cultures with price history sparklines, supports physical/credited weight toggle, per-elevator filtering. |
| `06-formulas.png` | Duval formula breakdown — step-by-step transparency: each calculation step with number substitution, lets the user verify math cell-by-cell. |
| `app-icon-1024.png` | App icon (1024×1024) for thumbnails / favicons. |

## URLs (public, durable)

After commit + Netlify deploy:
- `https://graincheck.app/promo/01-calculator-realistic.png`
- `https://graincheck.app/promo/02-form36-pdf.png`
- `https://graincheck.app/promo/03-prices-history.png`
- `https://graincheck.app/promo/06-formulas.png`
- `https://graincheck.app/promo/app-icon-1024.png`

Alternative raw URLs (immediate, no Netlify wait):
- `https://raw.githubusercontent.com/softinform/graincheck-site/main/promo/<filename>`

## License

Marketing materials — © 2026 SoftInform LLC. Use permitted for editorial coverage, partner placements, and AI-generated content briefs about GrainCheck. Do not re-brand or composite into competitive product comparisons without permission.
