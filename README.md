# Ashutosh Salunke — Portfolio

A single-page portfolio site (HTML/CSS/JS, no build step) styled to match the original dark ServiceNow-themed design, updated with current resume content and scroll-triggered animations.

## Files
- `index.html` — page structure/content
- `style.css` — theme, layout, animations
- `script.js` — scroll reveals, animated counters, nav behavior, contact form
- `Ashutosh_Salunke_Resume.pdf` — downloadable resume (linked from the hero and contact section)

## Run locally
Just open `index.html` in a browser — no build tools or dependencies needed.

## Deploy to GitHub Pages
1. Create a new GitHub repository (e.g. `portfolio`).
2. Push these files to the repo root (or to a `docs/` folder — see step 4).
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**, pick the `main` branch and `/ (root)` folder, then **Save**.
5. Wait a minute, then visit `https://<your-username>.github.io/<repo-name>/`.

## Customizing
- Update text directly in `index.html` (sections are labeled with HTML comments like `<!-- ================= ABOUT ================= -->`).
- Colors and fonts live at the top of `style.css` under `:root`.
- To swap the resume file, replace `Ashutosh_Salunke_Resume.pdf` and keep the same filename, or update the two `href` references in `index.html`.
- The contact form has no backend — submitting it opens the visitor's email client pre-filled with their message (via a `mailto:` link). To capture messages directly, hook the form up to a service like Formspree or Netlify Forms.

## Changelog (this update)
- Removed the mouse-follow glow cursor effect (was `.glow-cursor` in `style.css`, the matching `<div id="glowCursor">` in `index.html`, and the "CURSOR GLOW" mousemove/mouseleave listeners in `script.js`).
- Verified the layout, section order, spacing, and card grids against the provided theme reference — no content was changed, only the cursor-glow removal above.
