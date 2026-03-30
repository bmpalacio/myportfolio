# Portfolio

Static portfolio page: hero with GitHub avatar, links to games on GitHub Pages, LinkedIn, and a last-updated date. No build step.

## Run locally

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Configure

Edit [`config.js`](config.js):

- `name`, `tagline`
- `githubUsername` — used for avatar (`https://github.com/username.png`) and GitHub profile link
- `linkedinUrl`
- `lastUpdated` — bump when you change the site
- `games` — array of `{ title, description, url }`

## Deploy on GitHub Pages

1. Create a new repository on GitHub (any name, e.g. `portfolio` or `username.github.io` for a user site).
2. Push this folder’s contents to the repo (`main` branch).
3. Repository **Settings → Pages**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main`, folder **/ (root)** (or `/docs` if you move files there).
4. After a minute or two, the site is live at:
   - This repo (project site): [https://bmpalacio.github.io/myportfolio/](https://bmpalacio.github.io/myportfolio/)
   - User site (only if repo is named `username.github.io`): `https://username.github.io/`

This site uses **relative** asset paths (`styles.css`, `config.js`), so it works as a project page without extra base URL configuration.

## Repo URL vs live URL

You do not need the final Pages URL to develop locally. After you know your GitHub username and repo name, the live URL follows the pattern above.

## If the site is stale but `main` is correct (Actions queued / cancelled)

GitHub Pages can use **GitHub Actions** (“pages build and deployment”) or **Deploy from a branch**. For a static site like this, **Deploy from a branch** is simpler and avoids long queues or runs being **cancelled** when new commits arrive.

1. Repo **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch** (not GitHub Actions).
3. **Branch:** `main`, folder **`/ (root)`**, then **Save**.

The repo includes an empty [`.nojekyll`](.nojekyll) file so GitHub does not run Jekyll on your files. After saving, give it a minute and hard-refresh the live URL.

**Why runs show “Cancelled”:** Pushing again while a **pages build** is still running often **supersedes** the old run, so the UI shows it as cancelled. **Queued** can mean the free tier is waiting for a runner; switching to branch deploy avoids that pipeline for this site.
