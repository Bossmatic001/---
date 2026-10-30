# OFFICIAL BMT HUB — Reply Deck

A responsive, iPhone-friendly static web app with a branded welcome screen, access-code screen, and rule-based comment reply generator.

## Default access code
`BMT2026`

To change it, open `app.js` and edit:
`const ACCESS_CODE = "BMT2026";`

## Publish on GitHub Pages
Upload/replace the files in the repository root. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then Save. Wait for publishing and open the Pages URL.

## Important security note
This is a static front-end access gate, not secure authentication. Because GitHub Pages serves public source files, anyone who can inspect `app.js` can discover the code. Do not use this for sensitive information or claim that the site is truly private. A real private access-key system requires server-side authentication or an authentication service.

## How replies work
Replies are generated from local JavaScript rules and templates; no AI API is connected. They are varied by detected comment type, selected reply style, and tone. Review every draft before posting.
