# Vinit Shimpi – Portfolio Website

A responsive, single-page portfolio built with plain **HTML, CSS and JavaScript** (no build step, no frameworks). All content comes from the resume.

## Project structure

```
portfolio/
├── index.html
├── css/style.css
├── js/
│   ├── main.js        # animations, theme toggle, filters, contact form
│   └── config.js      # <-- your links live here
├── assets/
│   ├── profile.png
│   └── Vinit_Shimpi_Resume.pdf   # used by the Download Resume button
└── .nojekyll
```

## 1. Add your links (important)

Open `js/config.js` and fill in the empty values:

```js
github: "https://github.com/vinitshimpi4-cell",   // already set
projectLinks: { s3: "https://..." }    // "View Project" link for the S3 site
```

LinkedIn, email and phone are already set from your resume. Any link left as `""` is hidden automatically, so there are no dead buttons.

## 2. Preview locally

Just double-click `index.html`, or run a tiny server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## 3. Deploy to GitHub Pages

1. Create a GitHub account/sign in, then click **New repository**.
   - Name it `vinitshimpi4-cell.github.io` for the root URL `https://vinitshimpi4-cell.github.io/` (this is the link now printed on the resume); or use `your-username.github.io` for a root URL (`https://your-username.github.io`), or any name (e.g. `portfolio`) for `https://your-username.github.io/portfolio`.
   - Set it to **Public**.
2. Upload the files:
   - **Easiest:** on the new repo page click **uploading an existing file**, unzip this ZIP, drag in *everything inside the `portfolio` folder* (so `index.html` is at the repo root), and click **Commit changes**.
   - **Or with Git:**
     ```bash
     cd portfolio
     git init
     git add .
     git commit -m "Add portfolio website"
     git branch -M main
     git remote add origin https://github.com/your-username/your-repo.git
     git push -u origin main
     ```
3. In the repo go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
5. Wait 1–2 minutes. Your site URL appears at the top of the Pages settings.

## 4. After deploying

- Put your live site URL in the "Portfolio" link on your resume and LinkedIn.
- To update the resume, replace `assets/Vinit_Shimpi_Resume.pdf` (keep the same file name) and commit.

## Customising

- Colours: CSS variables at the top of `css/style.css`.
- Text/projects: edit `index.html` directly.
- Contact form: it opens the visitor's email app pre-filled (works on a static host with no backend).
