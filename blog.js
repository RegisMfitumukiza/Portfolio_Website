(function () {
  const data = window.BLOG_DATA || { posts: [], authors: {} };
  const posts = Array.isArray(data.posts) ? data.posts : [];
  const authors = data.authors || {};

  function authorFor(post) {
    return authors[post.authorId] || { name: "Regis Mfitumukiza", avatarText: "RM" };
  }

  function esc(v) {
    return String(v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function catClass(category) {
    return `blog-badge-${category}`;
  }

  const WPM = 200;

  function countWords(text) {
    return String(text || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }

  function wordCountFromBlocks(blocks) {
    if (!Array.isArray(blocks)) return 0;
    let n = 0;
    for (const b of blocks) {
      if (!b || !b.type) continue;
      if (b.type === "p" || b.type === "blockquote" || b.type === "h2" || b.type === "h3") {
        n += countWords(b.text);
      } else if (b.type === "ul") {
        (b.items || []).forEach((item) => {
          n += countWords(item);
        });
      } else if (b.type === "code") {
        n += countWords(b.code);
      } else if (b.type === "img" && b.caption) {
        n += countWords(b.caption);
      }
    }
    return n;
  }

  function readMinutesFromPost(post) {
    const words = wordCountFromBlocks(post.content || []);
    if (words <= 0) return null;
    return Math.max(1, Math.ceil(words / WPM));
  }

  function readTimeLabel(post) {
    const mins = readMinutesFromPost(post);
    if (mins != null) return `${mins} min read`;
    const fallback = post.readTime;
    return fallback ? String(fallback) : "1 min read";
  }

  function slugifyHeading(text, index) {
    let base = String(text || "")
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!base) base = `section-${index}`;
    return base;
  }

  function ensureHeadingIds(contentRoot) {
    if (!contentRoot) return [];
    const headings = Array.from(contentRoot.querySelectorAll("h2, h3"));
    const used = new Set(Array.from(document.querySelectorAll("[id]")).map((el) => el.id));
    headings.forEach((el, i) => {
      if (el.id && el.id.trim()) return;
      let base = slugifyHeading(el.textContent, i);
      let id = base;
      let n = 1;
      while (used.has(id)) {
        id = `${base}-${n++}`;
      }
      used.add(id);
      el.id = id;
    });
    return headings;
  }

  function pickRelatedPosts(current, limit) {
    const others = posts.filter((p) => p.slug !== current.slug);
    if (!others.length) return [];
    const curTags = new Set(current.tags || []);
    const scored = others.map((p) => {
      let score = 0;
      if (p.category === current.category) score += 4;
      (p.tags || []).forEach((t) => {
        if (curTags.has(t)) score += 2;
      });
      return { p, score };
    });
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return String(b.p.dateISO || "").localeCompare(String(a.p.dateISO || ""));
    });
    return scored.slice(0, limit).map(({ p }) => p);
  }

  function createRelatedCard(post) {
    const author = authorFor(post);
    const card = document.createElement("article");
    card.className = "related-card";
    card.innerHTML = `
      <a class="related-card-media" href="./post.html?slug=${encodeURIComponent(post.slug)}" aria-hidden="true" tabindex="-1">
        <img src="${esc(post.coverImage)}" alt="" loading="lazy" decoding="async" />
      </a>
      <div class="related-card-body">
        <span class="related-card-badge blog-badge ${catClass(post.category)}">${esc(post.categoryLabel)}</span>
        <h3 class="related-card-title">
          <a href="./post.html?slug=${encodeURIComponent(post.slug)}">${esc(post.title)}</a>
        </h3>
        <p class="related-card-meta">
          <span class="blog-author">
            <span class="blog-avatar" aria-hidden="true">${esc(author.avatarText)}</span>
            ${esc(author.name)}
          </span>
          <span class="related-card-dot" aria-hidden="true">·</span>
          <span>${esc(readTimeLabel(post))}</span>
        </p>
      </div>
    `;
    return card;
  }

  function initReadingProgress(articleEl, endEl) {
    const root = document.querySelector("#read-progress");
    const bar = root?.querySelector(".read-progress-bar");
    if (!root || !bar || !articleEl || !endEl) return;

    const update = () => {
      const startTop = articleEl.getBoundingClientRect().top + window.scrollY;
      const endBottom = endEl.getBoundingClientRect().bottom + window.scrollY;
      const track = endBottom - startTop - window.innerHeight;
      const scrolled = window.scrollY - startTop;
      let pct = track > 0 ? (scrolled / track) * 100 : scrolled > 0 ? 100 : 0;
      pct = Math.max(0, Math.min(100, pct));
      bar.style.width = `${pct}%`;
      root.setAttribute("aria-valuenow", String(Math.round(pct)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
  }

  function buildTableOfContents(headings, tocList, tocAside) {
    if (!tocList || !tocAside || !headings.length) {
      tocAside?.setAttribute("hidden", "");
      return;
    }

    tocList.innerHTML = "";
    const prefersReduced =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    headings.forEach((heading) => {
      if (!heading.id) return;
      const li = document.createElement("li");
      li.className = heading.tagName === "H3" ? "post-toc-item is-h3" : "post-toc-item";
      const a = document.createElement("a");
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent || "";
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const target = document.getElementById(heading.id);
        if (!target) return;
        const headerEl = document.querySelector(".site-header");
        const offset = (headerEl?.offsetHeight || 0) + 12;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: prefersReduced ? "auto" : "smooth" });
        try {
          history.replaceState(null, "", `#${heading.id}`);
        } catch {
          // ignore invalid history state in edge environments
        }
      });
      li.appendChild(a);
      tocList.appendChild(li);
    });

    tocAside.removeAttribute("hidden");
  }

  function initTocActiveState(headings, tocList) {
    if (!headings.length || !tocList) return;
    const links = Array.from(tocList.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    const syncActive = () => {
      const headerH = document.querySelector(".site-header")?.offsetHeight || 0;
      const marker = window.scrollY + headerH + 48;
      let currentId = headings[0]?.id || "";
      for (const h of headings) {
        if (!h.id) continue;
        const top = h.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) currentId = h.id;
      }
      links.forEach((link) => {
        const id = link.getAttribute("href").slice(1);
        link.classList.toggle("is-active", id === currentId);
      });
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive, { passive: true });
  }

  function createListingCard(post, featured) {
    const author = authorFor(post);
    const article = document.createElement("article");
    article.className = `blog-card${featured ? " featured" : ""}`;
    article.dataset.category = post.category;
    article.innerHTML = `
      <a class="blog-card-media" href="./post.html?slug=${encodeURIComponent(post.slug)}" aria-label="${esc(post.title)}">
        <img src="${post.coverImage}" alt="${esc(post.title)} cover image" loading="lazy" decoding="async" />
      </a>
      <div class="blog-card-body">
        <div class="blog-meta">
          <span class="blog-badge ${catClass(post.category)}">${esc(post.categoryLabel)}</span>
          <time datetime="${esc(post.dateISO)}">${esc(post.dateLabel)}</time>
          <span>${esc(readTimeLabel(post))}</span>
        </div>
        <h2 class="blog-card-title">
          <a href="./post.html?slug=${encodeURIComponent(post.slug)}">${esc(post.title)}</a>
        </h2>
        <p class="blog-card-excerpt">${esc(post.excerpt)}</p>
        <div class="blog-card-footer">
          <span class="blog-author">
            <span class="blog-avatar" aria-hidden="true">${esc(author.avatarText)}</span>
            ${esc(author.name)}
          </span>
          <a class="blog-read-more" href="./post.html?slug=${encodeURIComponent(post.slug)}">Read More</a>
        </div>
      </div>
    `;
    return article;
  }

  function renderListing(filter) {
    const grid = document.querySelector("#blog-grid");
    if (!grid) return;
    const list = filter === "all" ? posts : posts.filter((p) => p.category === filter);
    grid.classList.add("is-filtering");
    setTimeout(() => {
      grid.innerHTML = "";
      list.forEach((post, idx) => grid.appendChild(createListingCard(post, filter === "all" && idx === 0)));
      observeCards();
      requestAnimationFrame(() => grid.classList.remove("is-filtering"));
    }, 120);
  }

  function observeCards() {
    const cards = Array.from(document.querySelectorAll(".blog-card"));
    if (!cards.length) return;
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    cards.forEach((card) => observer.observe(card));
  }

  function initFilters() {
    const wrap = document.querySelector("#blog-filters");
    if (!wrap) return;
    let current = "all";
    renderListing(current);
    wrap.addEventListener("click", (event) => {
      const btn = event.target.closest(".blog-filter-btn");
      if (!btn) return;
      current = btn.dataset.filter || "all";
      wrap.querySelectorAll(".blog-filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderListing(current);
    });
  }

  function contentToHtml(blocks) {
    return blocks
      .map((b) => {
        if (b.type === "p") return `<p>${esc(b.text)}</p>`;
        if (b.type === "h2") return `<h2>${esc(b.text)}</h2>`;
        if (b.type === "h3") return `<h3>${esc(b.text)}</h3>`;
        if (b.type === "blockquote") return `<blockquote>${esc(b.text)}</blockquote>`;
        if (b.type === "ul")
          return `<ul>${(b.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
        if (b.type === "img") {
          return `
            <figure class="blog-inline-figure">
              <img src="${b.src}" alt="${esc(b.alt || "Article image")}" loading="lazy" decoding="async" />
              ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}
            </figure>
          `;
        }
        if (b.type === "code") {
          const code = esc(b.code || "");
          const lang = esc(b.language || "CODE");
          return `
            <section class="blog-code">
              <header class="blog-code-head">
                <span class="blog-code-dots"><i></i><i></i><i></i></span>
                <span class="blog-code-lang">${lang}</span>
                <button type="button" class="blog-code-copy" data-code="${code}">Copy</button>
              </header>
              <pre><code>${code}</code></pre>
            </section>
          `;
        }
        return "";
      })
      .join("");
  }

  function renderComments(post) {
    const list = document.querySelector("#comments-list");
    if (!list) return;
    list.innerHTML = "";
    const comments = Array.isArray(post.comments) ? post.comments : [];
    comments.forEach((comment) => {
      const item = document.createElement("article");
      item.className = "comment-card";
      item.innerHTML = `
        <span class="comment-avatar" aria-hidden="true">${esc(comment.name.slice(0, 1).toUpperCase())}</span>
        <div class="comment-body">
          <p class="comment-head"><strong>${esc(comment.name)}</strong> <span>${esc(comment.date)}</span></p>
          <p>${esc(comment.text)}</p>
        </div>
      `;
      list.appendChild(item);
    });
  }

  function initPostPage() {
    const article = document.querySelector("#blog-post");
    if (!article) return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    const post = posts.find((p) => p.slug === slug) || posts[0];
    if (!post) return;
    const author = authorFor(post);

    document.querySelector("#post-badge").className = `blog-badge ${catClass(post.category)}`;
    document.querySelector("#post-badge").textContent = post.categoryLabel;
    document.title = `${post.title} | Regis Mfitumukiza`;
    document.querySelector("#post-title").textContent = post.title;
    document.querySelector("#post-author").innerHTML = `<span class="blog-avatar" aria-hidden="true">${esc(author.avatarText)}</span>${esc(author.name)}`;
    document.querySelector("#post-date").textContent = post.dateLabel;
    document.querySelector("#post-read-time").textContent = readTimeLabel(post);
    const cover = document.querySelector("#post-cover");
    cover.src = post.coverImage;
    cover.alt = `${post.title} cover image`;
    const contentEl = document.querySelector("#post-content");
    contentEl.innerHTML = contentToHtml(post.content || []);
    const headings = ensureHeadingIds(contentEl);
    buildTableOfContents(headings, document.querySelector("#post-toc-list"), document.querySelector("#post-toc-aside"));
    initTocActiveState(headings, document.querySelector("#post-toc-list"));

    const relatedSection = document.querySelector("#related-posts");
    const relatedGrid = document.querySelector("#related-posts-grid");
    if (relatedSection && relatedGrid) {
      relatedGrid.innerHTML = "";
      const related = pickRelatedPosts(post, 3);
      if (related.length) {
        related.forEach((p) => relatedGrid.appendChild(createRelatedCard(p)));
        relatedSection.removeAttribute("hidden");
      } else {
        relatedSection.setAttribute("hidden", "");
      }
    }

    const endProgressEl = document.querySelector(".post-footer");
    initReadingProgress(article, endProgressEl);

    const tags = document.querySelector("#post-tags");
    tags.innerHTML = (post.tags || []).map((t) => `<span class="post-tag">${esc(t)}</span>`).join("");
    renderComments(post);

    document.querySelector("#share-linkedin").href =
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    document.querySelector("#share-twitter").href =
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`;

    document.querySelector("#share-copy").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const btn = document.querySelector("#share-copy");
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy Link"), 1200);
      } catch {
        // noop
      }
    });

    article.addEventListener("click", async (event) => {
      const btn = event.target.closest(".blog-code-copy");
      if (!btn) return;
      try {
        await navigator.clipboard.writeText(btn.getAttribute("data-code") || "");
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = "Copy"), 1200);
      } catch {
        btn.textContent = "Failed";
      }
    });

    const form = document.querySelector("#comment-form");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const text = String(fd.get("comment") || "").trim();
      if (!name || !email || !text) return;
      post.comments = post.comments || [];
      post.comments.unshift({
        name,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        text,
      });
      renderComments(post);
      form.reset();
    });

    requestAnimationFrame(() => article.classList.add("in-view"));
  }

  initFilters();
  initPostPage();
})();
