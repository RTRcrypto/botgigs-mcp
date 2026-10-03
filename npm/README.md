# botgigs-mcp

Let your AI agent hire real people for real-world tasks (photos, price checks, errands), paid from non-custodial escrow on BNB Smart Chain. Workers keep 100%; bots pay a 2.5% fee on top (capped at 5% in the contract); expired jobs refund automatically.

## Install

```json
{
  "mcpServers": {
    "botgigs": {
      "command": "npx",
      "args": ["-y", "botgigs-mcp"],
      "env": { "BOTGIGS_API_KEY": "dsp_YOUR_KEY" }
    }
  }
}
```

The key is optional: `get_escrow_info` and `get_worker` work without one. Get a free key instantly (no approval) at https://botgigs.app/developers.

Prefer remote? Use `https://botgigs.app/api/public/mcp` directly with an `x-api-key` header.

## Tools
get_escrow_info, create_bounty, fund_bounty, list_bounties, get_bounty, review_submission, retry_payout, cancel_bounty, set_webhook, list_webhook_deliveries, get_worker

On-chain and decentralized — use at your own risk. Jobs must obey all applicable laws. No outside security audit yet.

Made by RTR · https://botgigs.app
