---
name: testing-medtoken
description: Test the MedToken page end-to-end. Use when verifying tokenomics data changes, MBC token display, or medtoken module updates.
---

# Testing MedToken Page

## Setup

1. Install dependencies: `npm install` from repo root
2. Start dev server: `npm run dev` (runs on port 3000)
3. The site uses `basePath: "/medbyclick-site"` — all URLs are prefixed with `/medbyclick-site/`

## Key URLs

- MedToken page: `http://localhost:3000/medbyclick-site/medtoken/`

## What to Verify

The medtoken page renders data from `modules/medtoken/data.ts` (`tokenInfo` object):

- **Hero stats grid**: Symbol, Network, Standard, Price
- **Total Supply panel**: Shows total supply and tokenomics distribution bars with percentages
- **Token Use Cases section**: 6 use case cards with icons
- **Tokenomics section**: Individual cards for each allocation category showing percentage, description, and calculated MBC amount (`totalSupply * percentage / 100`)
- **Roadmap section**: 4 phases with completion status
- **Loyalty section**: Balance, earn actions, rewards, membership tiers

## Key Data File

`modules/medtoken/data.ts` contains:
- `tokenInfo`: main token configuration (name, symbol, network, standard, totalSupply, priceUsd, tokenomics array, roadmap, useCases)
- `tiers`: membership tier definitions
- `rewards`: redeemable reward items
- `earnActions`: token earning activities

## Common Issues

- If the page 404s, check that you're using the `/medbyclick-site/` prefix (basePath configured in `next.config.ts`)
- Port 3000 may already be in use from a previous dev server — kill existing processes or use a different port
- The project uses `bun.lock` but `npm install` works fine as a fallback

## Lint

```bash
npm run lint
```

Pre-existing lint errors exist in `app/dashboard/` and `app/medical-travel/` — these are unrelated to the medtoken module.
