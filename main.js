(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  function safeHttpUrl(u) {
    try {
      const parsed = new URL(u);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
      return parsed.href;
    } catch {
      return null;
    }
  }

  function safePreviewPath(p) {
    if (typeof p !== "string" || !p) return null;
    const s = p.trim();
    if (!s.startsWith("previews/") || s.includes("..")) return null;
    if (!/^previews\/[\w.-]+$/.test(s)) return null;
    return s;
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

  const nameEl = document.getElementById("site-name");
  if (nameEl) nameEl.textContent = cfg.name;

  const gh = cfg.githubUsername;
  const avatarEl = document.getElementById("avatar");
  if (avatarEl) {
    if (gh && gh !== "YOUR_GITHUB_USERNAME") {
      const profileUrl = `https://github.com/${encodeURIComponent(gh)}`;
      avatarEl.src = `${profileUrl}.png`;
      avatarEl.alt = `${cfg.name} — GitHub profile photo`;
      avatarEl.removeAttribute("hidden");
    } else {
      avatarEl.setAttribute("hidden", "");
      avatarEl.alt = "";
    }
  }

  const footerLinkedIn = document.getElementById("footer-linkedin");
  const liUrl = cfg.linkedinUrl && safeHttpUrl(cfg.linkedinUrl);
  if (footerLinkedIn) {
    if (liUrl) {
      footerLinkedIn.href = liUrl;
    } else {
      footerLinkedIn.hidden = true;
    }
  }

  const footerGitHub = document.getElementById("footer-github");
  if (footerGitHub && gh && gh !== "YOUR_GITHUB_USERNAME") {
    footerGitHub.href = `https://github.com/${encodeURIComponent(gh)}`;
  }

  const emailBtn = document.getElementById("email-copy");
  const emailFeedback = document.getElementById("email-copy-feedback");
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
  if (list) {
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
      const thumbPath = safePreviewPath(g.preview);
      if (thumbPath) {
        const img = document.createElement("img");
        img.className = "game-card__thumb";
        img.src = thumbPath;
        img.alt = g.title ? String(g.title) : "";
        img.width = 152;
        img.height = 95;
        img.loading = "lazy";
        img.decoding = "async";
        a.appendChild(img);
      }
      const textWrap = document.createElement("span");
      textWrap.className = "game-card__text";
      const titleEl = document.createElement("span");
      titleEl.className = "game-card__title";
      titleEl.textContent = g.title;
      const descEl = document.createElement("span");
      descEl.className = "game-card__desc";
      descEl.textContent = g.description || "";
      const ctaEl = document.createElement("span");
      ctaEl.className = "game-card__cta";
      ctaEl.textContent = "Play →";
      textWrap.appendChild(titleEl);
      textWrap.appendChild(descEl);
      textWrap.appendChild(ctaEl);
      a.appendChild(textWrap);
      liEl.appendChild(a);
      list.appendChild(liEl);
    });
  }

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
