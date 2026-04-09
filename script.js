const projects = [
  {
    title: "Leave Management System",
    description:
      "A full-stack leave management platform with an admin dashboard for requests, scheduling, and approvals.",
    image: "./Images/leave.webp",
    category: "fullstack",
    liveUrl: "",
    githubUrl: "https://github.com/RegisMfitumukiza/Leave_Management_System_Complete",
    tags: ["React", "Spring Boot", "PostgreSQL", "Microservices", "MUI"],
  },
  {
    title: "Rwanda Heritage Guard System",
    description:
      "A culture & heritage management system with an admin dashboard and a public-facing experience for users.",
    image: "./Images/Culture.webp",
    category: "fullstack",
    liveUrl: "",
    githubUrl: "https://github.com/RegisMfitumukiza/Rwanda_Heritage_Guard_System",
    tags: ["React", "Tailwind CSS", "shadcn/ui", "Spring Boot", "PostgreSQL"],
  },
];

const CATEGORY_BADGE_LABEL = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full-stack",
};

const projectsGrid = document.querySelector("#projects-grid");
const projectsEmptyEl = document.querySelector("#projects-empty");
const projectFilterButtons = document.querySelectorAll(".project-filter-btn");
const modal = document.querySelector("#project-modal");
const closeModalBtn = document.querySelector("#close-modal");

let activeProjectFilter = "all";

/**
 * Subtle perspective tilt driven by pointer position (skipped if reduced motion).
 */
function attachProjectCardTilt(card) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  card.classList.add("project-card--tilt");

  const maxDeg = 6;
  const perspective = 900;
  const lift = -6;

  function applyTilt(clientX, clientY) {
    const rect = card.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    const rotateY = px * maxDeg;
    const rotateX = -py * maxDeg;

    card.style.transitionDelay = "0s";
    card.style.transition = "box-shadow 0.3s ease, transform 0.18s ease-out";
    card.style.transform = `perspective(${perspective}px) translateY(${lift}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  card.addEventListener("mouseenter", (e) => {
    applyTilt(e.clientX, e.clientY);
  });

  card.addEventListener("mousemove", (e) => {
    applyTilt(e.clientX, e.clientY);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "box-shadow 0.3s ease, transform 0.35s ease";
    card.style.transform = "";
  });
}

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.category = project.category;

  const tagsHtml = project.tags
    .map((tag) => `<span class="project-tech-tag">${tag}</span>`)
    .join("");

  const badgeText = CATEGORY_BADGE_LABEL[project.category] || project.category;

  const liveLinkHtml = project.liveUrl
    ? `<a class="project-overlay-link" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
    : `<span class="project-overlay-link is-disabled" title="Live demo coming soon" aria-disabled="true">Live Demo</span>`;

  const githubLink =
    project.githubUrl && project.githubUrl !== "#"
      ? `<a class="project-overlay-link" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>`
      : `<span class="project-overlay-link is-disabled" title="Repository link coming soon" aria-disabled="true">GitHub</span>`;

  article.innerHTML = `
    <div class="project-media">
      <div class="project-image-wrap">
        <img
          src="${project.image}"
          alt=""
          loading="lazy"
          decoding="async"
          width="960"
          height="420"
        />
        <span class="project-category-badge">${badgeText}</span>
        <div class="project-overlay">
          ${liveLinkHtml}
          ${githubLink}
        </div>
      </div>
    </div>
    <div class="project-body">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tech-tags">${tagsHtml}</div>
    </div>
  `;

  const img = article.querySelector("img");
  if (img) img.alt = `Preview screenshot for ${project.title}`;

  attachProjectCardTilt(article);
  return article;
}

function renderProjects() {
  if (!projectsGrid) return;

  const list =
    activeProjectFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeProjectFilter);

  projectsGrid.innerHTML = "";

  if (list.length === 0) {
    if (projectsEmptyEl) projectsEmptyEl.hidden = false;
    return;
  }

  if (projectsEmptyEl) projectsEmptyEl.hidden = true;
  list.forEach((project) => projectsGrid.appendChild(createProjectCard(project)));
}

function initProjectFilters() {
  projectFilterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.filter || "all";
      activeProjectFilter = next;
      projectFilterButtons.forEach((b) => b.classList.toggle("active", b === btn));
      renderProjects();
    });
  });
}

initProjectFilters();

const projectsSectionEl = document.querySelector("#projects.projects-section");
if ("IntersectionObserver" in window && projectsSectionEl) {
  const projectsRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        projectsSectionEl.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );
  projectsRevealObserver.observe(projectsSectionEl);
} else if (projectsSectionEl) {
  projectsSectionEl.classList.add("in-view");
}

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener("click", () => modal.close());
}

window.addEventListener("click", (event) => {
  if (modal && event.target === modal) modal.close();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
navAnchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;

    event.preventDefault();
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Experience / timeline tabs
const experienceSection = document.querySelector("#timeline.experience-section");
const experienceTabs = document.querySelectorAll(".experience-tab");
const experiencePanels = document.querySelectorAll(".experience-timeline");
const EXPERIENCE_TAB_STORAGE_KEY = "experienceTab";

function setActiveExperienceTab(targetKey) {
  experienceTabs.forEach((tab) => {
    const key = tab.dataset.tab;
    const isActive = key === targetKey;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  experiencePanels.forEach((panel) => {
    const isWork = panel.id === "experience-work" && targetKey === "work";
    const isEdu = panel.id === "experience-education" && targetKey === "education";
    const isActive = isWork || isEdu;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  if (experienceSection) {
    // trigger fade for the newly active panel
    experienceSection.classList.add("show-panel");
    const activePanel = experienceSection.querySelector(".experience-timeline.active");
    if (activePanel) {
      // restart per-panel animations on tab switch (line + card stagger)
      activePanel.classList.remove("animate");
      // force reflow so CSS transitions replay
      void activePanel.offsetWidth;
      if (experienceSection.classList.contains("in-view")) {
        activePanel.classList.add("animate");
      }
    }
  }
}

if (experienceTabs.length && experiencePanels.length) {
  experienceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.tab || "work";
      setActiveExperienceTab(key);
      try {
        localStorage.setItem(EXPERIENCE_TAB_STORAGE_KEY, key);
      } catch {
        // ignore storage failures (private mode, blocked, etc.)
      }
    });
  });

  // Restore last selected tab on reload.
  let savedTab = "work";
  try {
    savedTab = localStorage.getItem(EXPERIENCE_TAB_STORAGE_KEY) || "work";
  } catch {
    savedTab = "work";
  }
  if (savedTab !== "work" && savedTab !== "education") savedTab = "work";
  setActiveExperienceTab(savedTab);
}

// Typing animation for the hero subtitle.
const typedRoleEl = document.querySelector("#typed-role");
const typingWord = "Full-Stack Developer";
let typingIndex = 0;
let typingMode = "typing";

const TYPE_SPEED_MS = 90;
const PAUSE_AFTER_WORD_MS = 900;
const PAUSE_AFTER_DELETE_MS = 280;

function runTypingAnimation() {
  if (!typedRoleEl) return;

  if (typingMode === "typing") {
    typedRoleEl.textContent = typingWord.slice(0, typingIndex + 1);
    typingIndex += 1;

    if (typingIndex === typingWord.length) {
      typingMode = "pause-before-delete";
      setTimeout(runTypingAnimation, PAUSE_AFTER_WORD_MS);
      return;
    }

    setTimeout(runTypingAnimation, TYPE_SPEED_MS);
    return;
  }

  if (typingMode === "pause-before-delete") {
    typingMode = "deleting";
    setTimeout(runTypingAnimation, TYPE_SPEED_MS);
    return;
  }

  if (typingMode === "deleting") {
    typedRoleEl.textContent = typingWord.slice(0, Math.max(typingIndex - 1, 0));
    typingIndex -= 1;

    if (typingIndex <= 0) {
      typingIndex = 0;
      typingMode = "pause-before-type";
      setTimeout(runTypingAnimation, PAUSE_AFTER_DELETE_MS);
      return;
    }

    setTimeout(runTypingAnimation, TYPE_SPEED_MS);
    return;
  }

  typingMode = "typing";
  setTimeout(runTypingAnimation, TYPE_SPEED_MS);
}

const observedSections = Array.from(
  document.querySelectorAll("main section[id]")
).filter((section) => section.id);

const navLinkBySectionId = new Map(
  Array.from(navAnchorLinks)
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return null;
      return [href.slice(1), link];
    })
    .filter(Boolean)
);

if ("IntersectionObserver" in window && observedSections.length > 0) {
  const visibleSections = new Set();
  const sectionPriority = ["hero", "about", "projects", "skills", "timeline", "contact"];
  const sectionPriorityMap = new Map(
    sectionPriority.map((id, index) => [id, index])
  );

  const setActiveSectionLink = () => {
    if (visibleSections.size === 0) return;
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const sorted = Array.from(visibleSections).sort(
      (a, b) =>
        Math.abs(a.getBoundingClientRect().top - headerHeight) -
          Math.abs(b.getBoundingClientRect().top - headerHeight) ||
        (sectionPriorityMap.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
          (sectionPriorityMap.get(b.id) ?? Number.MAX_SAFE_INTEGER)
    );
    const activeSection = sorted[0];
    const activeLink = navLinkBySectionId.get(activeSection.id);

    navAnchorLinks.forEach((link) => link.classList.remove("active"));
    if (activeLink) activeLink.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target);
        } else {
          visibleSections.delete(entry.target);
        }
      });
      setActiveSectionLink();
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-14% 0px -45% 0px",
    }
  );

  observedSections.forEach((section) => observer.observe(section));
}

const aboutSection = document.querySelector("#about.about-section");
const aboutCounters = document.querySelectorAll(".about-stat-value[data-count-target]");
let hasAnimatedAboutCounts = false;

function animateCountUp(element, target, durationMs = 1100) {
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    element.textContent = `${value}+`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window && aboutSection) {
  const aboutObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        aboutSection.classList.add("in-view");

        if (!hasAnimatedAboutCounts) {
          const STATS_START_DELAY_MS = 450;
          setTimeout(() => {
            aboutCounters.forEach((counterEl, index) => {
              const target = Number(counterEl.getAttribute("data-count-target") || 0);
              if (!target) return;
              setTimeout(() => animateCountUp(counterEl, target), index * 140);
            });
          }, STATS_START_DELAY_MS);
          hasAnimatedAboutCounts = true;
        }

        observer.unobserve(aboutSection);
      });
    },
    { threshold: 0.35, rootMargin: "0px 0px -12% 0px" }
  );

  aboutObserver.observe(aboutSection);
}

const themeToggle = document.querySelector("#theme-toggle");
const rootBody = document.body;

const THEME_STORAGE_KEY = "theme";

function iconMoon() {
  return `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M21 15.8A8.5 8.5 0 0 1 8.2 3a7 7 0 1 0 12.8 12.8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `;
}

function iconSun() {
  return `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

function applyTheme(theme) {
  const isLight = theme === "light";
  rootBody.classList.toggle("light-theme", isLight);
  rootBody.classList.toggle("dark-theme", !isLight);

  if (themeToggle) {
    themeToggle.innerHTML = isLight ? iconSun() : iconMoon();
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    themeToggle.setAttribute("aria-pressed", String(isLight));
  }
}

let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
} catch {
  savedTheme = "dark";
}

if (savedTheme !== "light" && savedTheme !== "dark") savedTheme = "dark";
applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const next = rootBody.classList.contains("light-theme") ? "dark" : "light";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // ignore storage failures
  }
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function setFieldError(fieldName, message) {
  const el = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (el) el.textContent = message || "";
}

function clearContactErrors() {
  ["name", "email", "subject", "message"].forEach((field) => setFieldError(field, ""));
  if (formStatus) formStatus.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearContactErrors();

  const data = new FormData(contactForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const subject = String(data.get("subject") || "").trim();
  const message = String(data.get("message") || "").trim();
  const hp = String(data.get("hp") || "").trim();

  let hasError = false;

  if (!name) {
    setFieldError("name", "Name is required.");
    hasError = true;
  }

  if (!email) {
    setFieldError("email", "Email is required.");
    hasError = true;
  } else if (!isValidEmail(email)) {
    setFieldError("email", "Please enter a valid email address.");
    hasError = true;
  }

  if (!subject) {
    setFieldError("subject", "Subject is required.");
    hasError = true;
  }

  if (!message) {
    setFieldError("message", "Message is required.");
    hasError = true;
  }

  if (hasError) return;

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const previousBtnText = submitBtn?.textContent || "";
  if (submitBtn) {
    submitBtn.setAttribute("disabled", "true");
    submitBtn.textContent = "Sending...";
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message, hp }),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok || payload.ok === false) {
      const msg =
        payload.message ||
        "Could not send your message right now. Please try again.";
      if (formStatus) formStatus.textContent = msg;
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Message sent successfully. I'll get back to you soon.";
    }
    contactForm.reset();
  } catch {
    if (formStatus) {
      formStatus.textContent =
        "Network error. Please check your connection and try again.";
    }
  } finally {
    if (submitBtn) {
      submitBtn.removeAttribute("disabled");
      submitBtn.textContent = previousBtnText || "Send Message";
    }
  }
});

// Contact section scroll reveal
const contactSectionEl = document.querySelector("#contact.contact-section");
if (contactSectionEl && "IntersectionObserver" in window) {
  const contactObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        contactSectionEl.classList.add("in-view");
        observer.unobserve(contactSectionEl);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -18% 0px" }
  );

  contactObserver.observe(contactSectionEl);
} else if (contactSectionEl) {
  contactSectionEl.classList.add("in-view");
}

const yearEls = document.querySelectorAll("#year, .js-year");
yearEls.forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

runTypingAnimation();
renderProjects();

// Footer: reveal + back-to-top + footer link smooth scroll
const footerEl = document.querySelector(".site-footer");
const backToTopBtn = document.querySelector("#back-to-top");

backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (backToTopBtn) {
  backToTopBtn.classList.add("is-sticky");
  const toggleBackToTop = () => {
    backToTopBtn.classList.toggle("is-visible", window.scrollY > 450);
  };
  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
}

const footerAnchorLinks = document.querySelectorAll('.site-footer a[href^="#"]');
footerAnchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;

    event.preventDefault();
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

if (footerEl && "IntersectionObserver" in window) {
  const footerObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        footerEl.classList.add("in-view");
        observer.unobserve(footerEl);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );
  footerObserver.observe(footerEl);
} else if (footerEl) {
  footerEl.classList.add("in-view");
}

// Skills & Expertise: reveal + progress-bar fill animation.
const skillsSectionEl = document.querySelector("#skills.skills-section");
if (skillsSectionEl && "IntersectionObserver" in window) {
  const skillRows = Array.from(skillsSectionEl.querySelectorAll(".skills-row"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateSkillRow(fillEl, valueEl, targetPercent, durationMs) {
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = easeOutCubic(progress);
      const value = Math.round(targetPercent * eased);

      if (valueEl) valueEl.textContent = `${value}%`;
      fillEl.style.transform = `scaleX(${value / 100})`;

      if (progress < 1) requestAnimationFrame(tick);
    };

    // Ensure it starts from 0% visually.
    if (valueEl) valueEl.textContent = "0%";
    fillEl.style.transform = "scaleX(0)";
    requestAnimationFrame(tick);
  }

  let hasAnimated = false;
  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        skillsSectionEl.classList.add("in-view");

        if (!hasAnimated) {
          hasAnimated = true;

          if (reducedMotion) {
            skillRows.forEach((row) => {
              const fillEl = row.querySelector(".skills-progress-fill");
              const valueEl = row.querySelector(".skills-progress-value");
              const targetPercent = Number(fillEl?.dataset.percent || 0);
              if (!fillEl || !targetPercent) return;
              if (valueEl) valueEl.textContent = `${targetPercent}%`;
              fillEl.style.transform = `scaleX(${targetPercent / 100})`;
            });
            return;
          }

          // Small delay so the text fade/reveal starts first.
          setTimeout(() => {
            const DURATION_MS = 1250;
            skillRows.forEach((row, index) => {
              const fillEl = row.querySelector(".skills-progress-fill");
              const valueEl = row.querySelector(".skills-progress-value");
              const targetPercent = Number(fillEl?.dataset.percent || 0);
              if (!fillEl || !targetPercent) return;

              setTimeout(() => {
                animateSkillRow(fillEl, valueEl, targetPercent, DURATION_MS);
              }, index * 60);
            });
          }, 220);
        }

        observer.unobserve(skillsSectionEl);
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -18% 0px" }
  );

  skillsObserver.observe(skillsSectionEl);
}

// Experience cards scroll reveal
if (experienceSection && "IntersectionObserver" in window) {
  const experienceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        experienceSection.classList.add("in-view");
        experienceSection.classList.add("show-panel");
        const activePanel =
          experienceSection.querySelector(".experience-timeline.active");
        if (activePanel) activePanel.classList.add("animate");
        observer.unobserve(experienceSection);
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -18% 0px" }
  );

  experienceObserver.observe(experienceSection);
}

// Timeline marker glow when scrolled into view (subtle, one-shot per item).
if (experienceSection && "IntersectionObserver" in window) {
  const timelineItems = experienceSection.querySelectorAll(".timeline-item");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  if (!reducedMotion && timelineItems.length) {
    const markerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target;
          item.classList.add("marker-in");
          item.classList.add("marker-glow");
        });
      },
      { threshold: 0.55, rootMargin: "0px 0px -12% 0px" }
    );

    timelineItems.forEach((item) => markerObserver.observe(item));
  }
}
