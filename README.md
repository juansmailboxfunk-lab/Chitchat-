# Chit Chat — One-page site (HTML/CSS/JS)

This zip contains a ready-to-run static site:
- `index.html`
- `css/style.css`
- `js/main.js`
- `images/` (placeholder SVGs you can replace with your final generated illustrations)

## How to run locally
Just open `index.html` in your browser.

For best results (and to avoid some browser security limits), use a local server:
- macOS: `python3 -m http.server 8080` (run inside the folder)
- then open http://localhost:8080

## Replace the illustrations
Replace any file inside `/images` with your final generated PNG/SVG, keeping the SAME filename.

Key files:
- `images/hero-desktop.svg` and `images/hero-mobile.svg`
- `images/croc-services.svg`, `images/croc-booking.svg`, `images/croc-about.svg`, `images/croc-contact.svg`
- `images/croc-faq-left.svg` and `images/croc-faq-right.svg`
- Overlay crocs: `images/croc-overlay-*.svg`

If you export PNGs, just rename them to match and update the `.svg` extension in `index.html` if you prefer.

## Service pop-up (overlay)
Each “Más información” button has:
- `data-title`, `data-subtitle`, `data-content` (HTML), `data-theme`, `data-croc`

Edit those attributes in `index.html` to change the overlay content per service.

## Contact form
Currently shows a demo alert.
To make it send messages, easiest option is Formspree:
1. Create a Formspree form and get the endpoint URL.
2. Add `action="YOUR_URL" method="POST"` to the `<form id="contactForm">`.
3. Remove the demo alert handler in `js/main.js` (or adjust it to submit via fetch).

## Deploy (GitHub Pages)
1. Create a repo and upload the files.
2. Enable GitHub Pages (Settings → Pages) with branch `main` and folder `/root`.
3. Your site will be live at your GitHub Pages URL.
