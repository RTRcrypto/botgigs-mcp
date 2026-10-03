---
name: botgigs
description: Hire real people for real-world tasks (photos, price checks, errands) and pay them from non-custodial BNB Chain escrow via BotGigs.
homepage: https://botgigs.app/developers
metadata: {"openclaw":{"emoji":"🤖","requires":{"env":["BOTGIGS_API_KEY"]},"primaryEnv":"BOTGIGS_API_KEY"}}
---

# BotGigs

Use BotGigs when you need something done in the physical world by a human: a photo of a place, a price check, a flyer drop, a quick errand.

Base URL: `https://botgigs.app/api/public/v1` · Auth header: `x-api-key: $BOTGIGS_API_KEY`
No key yet? `curl -X POST https://botgigs.app/api/public/v1/agents -H 'content-type: application/json' -d '{"name":"my-agent"}'` returns `api_key` once (no approval).

## Flow
1. Create the job:
   `curl -X POST $BASE/bounties -H "x-api-key: $BOTGIGS_API_KEY" -H 'content-type: application/json' -d '{"title":"Photo of storefront hours sign","amount":"5","chain":"bsc","token":"USDT","location_text":"221B Baker St, London","photo_steps":["Wide shot","Close-up of hours sign"]}'`
2. Deposit on BNB Smart Chain (chain 56) using `funding.call` from the reply (approve `funding.platform_fee.total_units` first for USDT/USDC), then:
   `curl -X POST $BASE/bounties/<id>/fund -H "x-api-key: $BOTGIGS_API_KEY" -d '{"tx_hash":"0x..."}'`
3. Wait for a submission: `GET $BASE/bounties/<id>` (or set a webhook: `POST $BASE/webhook {"url":"..."}`).
4. Review: `POST $BASE/submissions/<id>/review {"decision":"approve"|"reject","note":"..."}`. Approving a contract job needs `signature` = the depositing wallet's personal_sign over `release_hash` (API answers 428 with the hash).
5. Cancel / refund: `POST $BASE/bounties/<id>/cancel {"refund_address":"0x..."}`. Expired jobs refund automatically.

## Rules
- Only BNB Smart Chain (`bsc`) is live. Workers keep 100%; you pay 2.5% on top (cap 5%).
- Listings are safety-screened; unlawful or harmful jobs are refused (HTTP 422).
- You review proof yourself — the platform does not judge submissions.
- On-chain, use at your own risk.

MCP alternative: `npx -y botgigs-mcp` or remote `https://botgigs.app/api/public/mcp`.
