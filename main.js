(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const esc = (s) => {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  };

  document.getElementById("site-name").textContent = cfg.name;
  document.getElementById("site-tagline").textContent = cfg.tagline;

  function safeHttpUrl(u) {
    try {
      const parsed = new URL(u);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
      return parsed.href;
    } catch {
      return null;
    }
  }

  const gh = cfg.githubUsername;
  const avatarEl = document.getElementById("avatar");
  const ghLink = document.getElementById("github-profile-link");
  const ghSep = document.getElementById("github-sep");
  if (gh && gh !== "YOUR_GITHUB_USERNAME") {
    const profileUrl = `https://github.com/${encodeURIComponent(gh)}`;
    avatarEl.src = `${profileUrl}.png`;
    avatarEl.alt = `${cfg.name} — GitHub profile photo`;
    avatarEl.hidden = false;
    ghLink.href = profileUrl;
    ghLink.hidden = false;
    ghSep.hidden = false;
  } else {
    avatarEl.hidden = true;
    avatarEl.alt = "";
  }

  const li = document.getElementById("linkedin-link");
  li.href = cfg.linkedinUrl || "#";
  if (!cfg.linkedinUrl || cfg.linkedinUrl.includes("YOUR_PROFILE")) {
    li.setAttribute("aria-disabled", "true");
    li.classList.add("link-placeholder");
  }

  document.getElementById("last-updated").textContent = cfg.lastUpdated || "";

  const list = document.getElementById("games-list");
  list.innerHTML = "";
  (cfg.games || []).forEach((g) => {
    const href = safeHttpUrl(g.url);
    if (!href) return;
    const liEl = document.createElement("li");
    liEl.className = "game-card";
    const a = document.createElement("a");
    a.className = "game-card__link";
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `
      <span class="game-card__title">${esc(g.title)}</span>
      <span class="game-card__desc">${esc(g.description || "")}</span>
      <span class="game-card__cta">Play →</span>
    `;
    liEl.appendChild(a);
    list.appendChild(liEl);
  });

  const pageTitle = `${cfg.name} — Portfolio`;
  document.title = pageTitle;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogTitle) ogTitle.setAttribute("content", pageTitle);
  if (ogDesc) ogDesc.setAttribute("content", cfg.tagline);
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", cfg.tagline);
  if (ogImage && gh && gh !== "YOUR_GITHUB_USERNAME") {
    ogImage.setAttribute("content", `https://github.com/${gh}.png`);
  }
})();
