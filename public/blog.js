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
          <span>${esc(post.readTime)}</span>
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
    document.querySelector("#post-title").textContent = post.title;
    document.querySelector("#post-author").innerHTML = `<span class="blog-avatar" aria-hidden="true">${esc(author.avatarText)}</span>${esc(author.name)}`;
    document.querySelector("#post-date").textContent = post.dateLabel;
    document.querySelector("#post-read-time").textContent = post.readTime;
    const cover = document.querySelector("#post-cover");
    cover.src = post.coverImage;
    cover.alt = `${post.title} cover image`;
    document.querySelector("#post-content").innerHTML = contentToHtml(post.content || []);

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
const posts = [
  {
    title: "How I Build Responsive UI Systems",
    excerpt: "A practical workflow for scalable and responsive interfaces.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    category: "frontend",
    slug: "post.html",
  },
  {
    title: "From Figma to Production",
    excerpt: "Bridging design and development with component thinking.",
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=1000&q=80",
    category: "career",
    slug: "post.html",
  },
];

const blogGrid = document.querySelector("#blog-grid");
const blogFilters = document.querySelectorAll("#blog-filters .filter-btn");

function renderPosts(filter = "all") {
  if (!blogGrid) return;
  blogGrid.innerHTML = "";
  const filteredPosts =
    filter === "all" ? posts : posts.filter((post) => post.category === filter);

  filteredPosts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" />
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="./${post.slug}" class="btn btn-secondary">Read More</a>
    `;
    blogGrid.appendChild(card);
  });
}

blogFilters.forEach((button) => {
  button.addEventListener("click", () => {
    blogFilters.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderPosts(button.dataset.filter);
  });
});

renderPosts();
