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
