/**
 * BLOG DATA STRUCTURE
 * 
 * IMPORTANT: All cover images should be 1920x1080 (16:9 aspect ratio) for consistent
 * display across blog cards and post pages. Place images in the ./Images/ folder.
 * 
 * Example: coverImage: "./Images/my-cover-image.jpg"
 * 
 * The CSS uses object-fit: contain, so other sizes will work but may have letterboxing.
 * 1920x1080 ensures pixel-perfect quality across all displays.
 */

window.BLOG_DATA = {
  authors: {
    regis: {
      name: "Regis Mfitumukiza",
      avatarText: "RM",
    },
  },
  posts: [
    {
      slug: "clean-api-calls-javascript",
      category: "javascript",
      categoryLabel: "JavaScript",
      title: "Writing Cleaner API Calls in Vanilla JavaScript",
      excerpt:
        "A practical pattern for request handling, error normalization, and resilient UI states without frameworks.",
      dateISO: "2026-04-09",
      dateLabel: "Apr 9, 2026",
      readTime: "6 min read",
      coverImage: "./snippets/js snippet.JPG",
      authorId: "regis",
      tags: ["Web Development", "Tips", "Beginners", "Career"],
      comments: [
        {
          name: "Aline",
          date: "Apr 10, 2026",
          text: "This request wrapper pattern is clear and easy to adapt.",
        },
      ],
      content: [
        {
          type: "p",
          text:
            "When API logic gets duplicated across event handlers, bugs and inconsistency appear quickly. A small wrapper keeps behavior predictable and easy to test.",
        },
        { type: "h2", text: "Build one request utility" },
        {
          type: "code",
          language: "JS",
          code:
            "async function request(url, options = {}) {\n" +
            "  const response = await fetch(url, options);\n" +
            "  const payload = await response.json().catch(() => null);\n\n" +
            "  if (!response.ok) {\n" +
            "    throw new Error(payload?.message || `HTTP ${response.status}`);\n" +
            "  }\n\n" +
            "  return payload;\n" +
            "}",
        },
        {
          type: "blockquote",
          text:
            "Consistency in success and error flow matters more than complexity in implementation.",
        },
        {
          type: "img",
          src: "./snippets/js snippet.JPG",
          alt: "JavaScript request helper snippet",
          caption: "A compact helper can remove repeated fetch boilerplate.",
        },
      ],
    },
    {
      slug: "react-component-boundaries",
      category: "react",
      categoryLabel: "React",
      title: "Component Boundaries That Keep React Code Scalable",
      excerpt:
        "How to split presentational and stateful responsibilities so teams can ship faster with fewer regressions.",
      dateISO: "2026-04-05",
      dateLabel: "Apr 5, 2026",
      readTime: "5 min read",
      coverImage: "./snippets/figma.JPG",
      authorId: "regis",
      tags: ["Web Development", "Tips"],
      comments: [],
      content: [
        {
          type: "p",
          text:
            "The fastest way to slow a React project is to let UI components own too much side-effect logic.",
        },
        { type: "h3", text: "A practical split" },
        {
          type: "ul",
          items: [
            "Presentational components for rendering only.",
            "Hooks for fetching and transformation.",
            "Container components for orchestration.",
          ],
        },
      ],
    },
    {
      slug: "figma-to-code-checklist",
      category: "design",
      categoryLabel: "Design",
      title: "My Figma-to-Code Handoff Checklist",
      excerpt:
        "A simple checklist that reduces rework by aligning spacing, typography, and component states before implementation.",
      dateISO: "2026-03-29",
      dateLabel: "Mar 29, 2026",
      readTime: "4 min read",
      coverImage: "./snippets/figma.JPG",
      authorId: "regis",
      tags: ["Beginners", "Tips"],
      comments: [],
      content: [
        {
          type: "p",
          text:
            "Before coding starts, confirm tokens, breakpoints, and interactive states. This removes most visual drift later.",
        },
      ],
    },
    {
      slug: "spring-boot-api-basics",
      category: "backend",
      categoryLabel: "Backend",
      title: "Spring Boot API Basics for Reliable Services",
      excerpt:
        "Lean controller patterns, validation, and response consistency for maintainable backend endpoints.",
      dateISO: "2026-03-20",
      dateLabel: "Mar 20, 2026",
      readTime: "7 min read",
      coverImage: "./snippets/js snippet.JPG",
      authorId: "regis",
      tags: ["Career", "Web Development"],
      comments: [],
      content: [
        { type: "p", text: "Backend quality starts with contracts and clear failure modes." },
      ],
    },
    {
      slug: "career-learning-loop",
      category: "career",
      categoryLabel: "Career",
      title: "A Weekly Learning Loop for Consistent Growth",
      excerpt:
        "A realistic workflow to keep improving while balancing coursework, projects, and delivery deadlines.",
      dateISO: "2026-03-11",
      dateLabel: "Mar 11, 2026",
      readTime: "4 min read",
      coverImage: "./snippets/figma.JPG",
      authorId: "regis",
      tags: ["Career", "Beginners", "Tips"],
      comments: [],
      content: [
        { type: "p", text: "Short focused blocks + reflection notes can compound into real skill growth." },
      ],
    },
  ],
};
