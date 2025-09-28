# ChitChat — Bilingual Static Site

Drop-in static site for GitHub Pages with ES/EN pages, GDPR basics, and a Formspree contact form.

## How to use
1. Replace the contents of your GitHub Pages repo with the `public/` folder contents.
2. Update `contact.html` (ES and EN) with your real Formspree endpoint.
3. Replace placeholders in `/assets/img/` and `/assets/icons/`.
4. Update meta titles/descriptions and `sitemap.xml` base URLs.
5. Commit & push — Pages will redeploy automatically.

## Notes
- Language toggle uses two parallel page trees: `/` (ES) and `/en/` (EN).
- Accessibility: labels, focus, skip link included.
- SEO basics included (`sitemap.xml`, `humans.txt`, `robots.txt`, OG image).

