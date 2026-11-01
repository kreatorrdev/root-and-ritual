# Contributing to Root & Ritual

Project documentation and contribution descriptions are maintained in English. Literal interface labels, identifiers and recorded output may retain their original language when needed for accuracy.

## Set up a working copy

Install locked dependencies with `npm ci`, then run `npm run dev`. Use the Node.js requirement in the [README](README.md).

Run project commands from the repository root.

## Make and validate a change

1. Create a focused branch from the current default branch and read the relevant specification and current status.
2. Make the change and update the affected English documentation.
3. For application changes, run the applicable checks below and inspect the affected experience.
4. Review the diff and open a pull request describing the problem, resulting behavior and checks actually performed. For documentation-only changes, verify links, paths and commands; a full application build is needed only if the change affects it.

~~~sh
npm run lint
npm run typecheck
npm test
npm run build
~~~

Check animation replay, scroll progression, dietary/category intersections, empty menu results, dish dialogs, gallery keyboard controls and reservation validation. Cover Portland time, closed Mondays and daylight-saving boundaries when changing booking logic.

## Content and configuration

Keep venue details and bookings explicitly fictional. Document image generation and font licenses in [the asset register](docs/ASSETS.md).

Use your own local configuration. Commit configuration templates with placeholders; keep real credentials, runtime databases, personal records and generated build caches out of Git. Do not add a license or claim redistribution rights for third-party material without the owner's decision.

## Release notes

Follow the [README deployment section](README.md#github-and-vercel-deployment). The portfolio reservation endpoint remains a demo when no delivery endpoint is configured.

Report dated verification honestly. Existing historical PASS records describe their recorded environment and do not establish that a new checkout or deployment has passed the same checks.
