(() => {
  const BLOG_POSTS_RAW = [
    {
      slug: "javascript-clean-api-calls",
      category: "javascript",
      categoryLabel: "JavaScript",
      title: "Writing Cleaner API Calls in Vanilla JavaScript",
      excerpt:
        "A practical pattern for handling loading, errors, retries, and predictable API responses with plain JavaScript.",
      coverImage: "./snippets/js snippet.JPG",
      dateISO: "2026-04-01",
      dateLabel: "Apr 1, 2026",
      readTime: "6 min read",
      authorId: "regis",
      tags: ["javascript", "webdev", "api"],
      content: [
        {
          type: "p",
          text:
            "Clean API calls make your UI easier to maintain and your debugging faster. The goal is to keep success and failure paths explicit.",
        },
        { type: "h2", text: "Use one request wrapper" },
        {
          type: "p",
          text:
            "A small helper can centralize JSON parsing, HTTP status handling, and human-friendly errors.",
        },
        {
          type: "img",
          src: "./snippets/js snippet.JPG",
          alt: "JavaScript API request wrapper snippet",
        },
        {
          type: "blockquote",
          text:
            "A consistent error shape is one of the fastest ways to improve product quality.",
        },
      ],
    },
    {
      slug: "react-component-architecture",
      category: "react",
      categoryLabel: "React",
      title: "Component Boundaries That Keep React Projects Scalable",
      excerpt:
        "How to split presentational and stateful concerns so your React codebase grows without becoming fragile.",
      coverImage: "./Images/Culture.webp",
      dateISO: "2026-03-22",
      dateLabel: "Mar 22, 2026",
      readTime: "5 min read",
      authorId: "regis",
      tags: ["react", "frontend", "architecture"],
      content: [
        {
          type: "p",
          text:
            "Reusable components should focus on rendering. Containers and hooks should focus on data and side effects.",
        },
        { type: "h3", text: "A practical split" },
        {
          type: "ul",
          items: [
            "Presentational components: props in, UI out.",
            "Hooks: fetching, memoization, derived state.",
            "Containers: connect hooks to UI and compose layout.",
          ],
        },
        {
          type: "p",
          text:
            "This structure improves testing and helps teams collaborate without stepping on each other.",
        },
      ],
    },
    {
      slug: "design-handoff-checklist",
      category: "design",
      categoryLabel: "Design",
      title: "My Figma-to-Code Handoff Checklist",
      excerpt:
        "The exact checklist I use before implementation to reduce rework and keep visual consistency.",
      coverImage: "./snippets/figma.JPG",
      dateISO: "2026-03-12",
      dateLabel: "Mar 12, 2026",
      readTime: "4 min read",
      authorId: "regis",
      tags: ["design", "figma", "workflow"],
      content: [
        {
          type: "p",
          text:
            "A strong handoff starts with naming consistency and spacing tokens. It keeps styling decisions predictable.",
        },
        {
          type: "ul",
          items: [
            "Color tokens and typography scale documented.",
            "Component states defined (hover, active, disabled).",
            "Mobile and desktop breakpoints clarified.",
          ],
        },
      ],
    },
    {
      slug: "spring-boot-api-basics",
      category: "backend",
      categoryLabel: "Backend",
      title: "Building Reliable REST APIs with Spring Boot",
      excerpt:
        "Simple backend patterns for validation, layered architecture, and clean response contracts.",
      coverImage: "./Images/Culture.webp",
      dateISO: "2026-02-25",
      dateLabel: "Feb 25, 2026",
      readTime: "7 min read",
      authorId: "regis",
      tags: ["backend", "springboot", "restapi"],
      content: [
        {
          type: "p",
          text:
            "Reliable APIs come from clear contracts. Validate early, return consistent error objects, and keep controllers thin.",
        },
        {
          type: "code",
          language: "java",
          code:
            "@PostMapping\n" +
            "public ResponseEntity<UserDto> create(@Valid @RequestBody CreateUserRequest req) {\n" +
            "  var saved = userService.create(req);\n" +
            "  return ResponseEntity.status(HttpStatus.CREATED).body(saved);\n" +
            "}",
        },
      ],
    },
    {
      slug: "career-learning-loop",
      category: "career",
      categoryLabel: "Career",
      title: "How I Build a Weekly Learning Loop",
      excerpt:
        "A practical routine for growing consistently while balancing projects, studies, and delivery work.",
      coverImage: "./snippets/js snippet.JPG",
      dateISO: "2026-02-10",
      dateLabel: "Feb 10, 2026",
      readTime: "4 min read",
      authorId: "regis",
      tags: ["career", "growth", "learning"],
      content: [
        {
          type: "p",
          text:
            "Consistency beats intensity. I use short focused sessions, weekly review notes, and real project application.",
        },
        {
          type: "blockquote",
          text: "Learn, build, reflect, and repeat.",
        },
      ],
    },
  ];

  const authors = window.BLOG_AUTHORS || {};
  const fallbackAuthor =
    authors.regis ||
    Object.values(authors)[0] || {
      name: "Mfitumukiza Regis",
      role: "Full-Stack Developer",
      avatarText: "MR",
      avatarFrom: "#22d3ee",
      avatarTo: "#0ea5e9",
    };

  window.BLOG_POSTS = BLOG_POSTS_RAW.map((post) => {
    const author = authors[post.authorId] || fallbackAuthor;
    return {
      ...post,
      authorName: author.name,
      authorRole: author.role,
      authorAvatarText: author.avatarText,
      authorAvatarFrom: author.avatarFrom,
      authorAvatarTo: author.avatarTo,
    };
  });
})();
