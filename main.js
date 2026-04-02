(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const esc = (s) => {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  };

  function safeHttpUrl(u) {
    try {
      const parsed = new URL(u);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
      return parsed.href;
    } catch {
      return null;
    }
  }

  function formatMDY(iso) {
    if (!iso) return "";
    const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
    if (Number.isNaN(d.getTime())) return iso;
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const yy = String(d.getFullYear()).slice(-2);
    return `${m}/${day}/${yy}`;
  }

  document.getElementById("site-name").textContent = cfg.name;

  const gh = cfg.githubUsername;
  const avatarEl = document.getElementById("avatar");
  if (gh && gh !== "YOUR_GITHUB_USERNAME") {
    const profileUrl = `https://github.com/${encodeURIComponent(gh)}`;
    avatarEl.src = `${profileUrl}.png`;
    avatarEl.alt = `${cfg.name} — GitHub profile photo`;
    avatarEl.hidden = false;
  } else {
    avatarEl.hidden = true;
    avatarEl.alt = "";
  }

  const headerLinkedIn = document.getElementById("header-linkedin");
  const liUrl = cfg.linkedinUrl && safeHttpUrl(cfg.linkedinUrl);
  if (headerLinkedIn) {
    if (liUrl) {
      headerLinkedIn.href = liUrl;
    } else {
      headerLinkedIn.hidden = true;
    }
  }

  const headerGitHub = document.getElementById("header-github");
  if (headerGitHub && gh && gh !== "YOUR_GITHUB_USERNAME") {
    headerGitHub.href = `https://github.com/${encodeURIComponent(gh)}`;
  }

  const emailBtn = document.getElementById("header-email-copy");
  const emailFeedback = document.getElementById("header-email-feedback");
  const email = cfg.email || "";
  let copyTimer;

  function showCopied() {
    if (!emailFeedback) return;
    emailFeedback.hidden = false;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(function () {
      emailFeedback.hidden = true;
    }, 2000);
  }

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      showCopied();
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showCopied();
      } catch {
        /* ignore */
      }
    }
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", copyEmail);
  }

  const footerUpdated = document.getElementById("footer-last-updated");
  if (footerUpdated) {
    const mdy = formatMDY(cfg.lastUpdated);
    footerUpdated.textContent = mdy ? `Last updated: ${mdy}` : "";
  }

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
