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
