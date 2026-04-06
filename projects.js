/**
 * Portfolio projects — each object uses the same shape:
 * @typedef {Object} PortfolioProject
 * @property {string} title       — Card heading
 * @property {string} description — Short summary (shown on card)
 * @property {string} category    — Badge label (e.g. language or type)
 * @property {string} imageURL    — Image src (absolute URL or path)
 * @property {string} imageAlt    — Accessible description of the image
 * @property {string} link        — Project URL (e.g. GitHub repo)
 * @property {string} linkLabel   — CTA button text
 */

/** Escape text when building HTML strings (avoids broken markup and XSS if data ever comes from elsewhere). */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * @param {PortfolioProject[]} projects
 * @param {string} query
 * @returns {PortfolioProject[]}
 */
function filterProjectsByQuery(projects, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return projects;
  }

  return projects.filter((project) => {
    const properties = [project.title, project.description, project.category, project.link]
      .join(" ")
      .toLowerCase();
    return properties.includes(normalized);
  });
}

const portfolioProjects = [
  {
    title: "VPN drop detection",
    description:
      "A C++ project focused on detecting VPN connection changes in network behavior. Code and documentation live on GitHub.",
    category: "C++",
    imageURL: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80",
    imageAlt: "Abstract network and security visualization",
    link: "https://github.com/bm-user/VPN_drop_detection",
    linkLabel: "View on GitHub",
  },
  {
    title: "Rock Paper Scissors",
    description:
      "A JavaScript implementation of the classic Rock Paper Scissors game. See the repository for source and setup.",
    category: "JavaScript",
    imageURL:
      "https://raw.githubusercontent.com/bm-user/Rock_Paper_Scissors/main/Images/GameUi.jpg",
    imageAlt: "Rock Paper Scissors game UI from the project repository",
    link: "https://github.com/bm-user/Rock_Paper_Scissors",
    linkLabel: "View on GitHub",
  },
  {
    title: "Coming Soon: More Projects",
    description:
      "Coming Soon: I'm actively working on new projects to add here. Check back soon for updates!",
    category: "C++",
    imageURL: "https://media.istockphoto.com/id/1144477744/vector/coming-soon-text-on-abstract-sunrise-dark-background-with-motion-effect.jpg?s=2048x2048&w=is&k=20&c=5lUrhxwZF5NJwOAqTjYChCLeU9722uaOJs3NX9WX4qE=",
    imageAlt: "Coming Soon: More Projects",
    link: "https://github.com/bm-user/VPN_drop_detection",
    linkLabel: "View on GitHub",
  },
  {
    title: "Coming Soon: More Projects",
    description:
      "Coming Soon: I'm actively working on new projects to add here. Check back soon for updates!",
    category: "C++",
    imageURL: "https://media.istockphoto.com/id/1144477744/vector/coming-soon-text-on-abstract-sunrise-dark-background-with-motion-effect.jpg?s=2048x2048&w=is&k=20&c=5lUrhxwZF5NJwOAqTjYChCLeU9722uaOJs3NX9WX4qE=",
    imageAlt: "Coming Soon: More Projects",
    link: "https://github.com/bm-user/VPN_drop_detection",
    linkLabel: "View on GitHub",
  },
  {
    title: "Coming Soon: More Projects",
    description:
      "Coming Soon: I'm actively working on new projects to add here. Check back soon for updates!",
    category: "C++",
    imageURL: "https://media.istockphoto.com/id/1144477744/vector/coming-soon-text-on-abstract-sunrise-dark-background-with-motion-effect.jpg?s=2048x2048&w=is&k=20&c=5lUrhxwZF5NJwOAqTjYChCLeU9722uaOJs3NX9WX4qE=",
    imageAlt: "Coming Soon: More Projects",
    link: "https://github.com/bm-user/VPN_drop_detection",
    linkLabel: "View on GitHub",
  },
];

/**
 * @param {HTMLElement} container — #project-grid mount point (hard-coded cards removed from HTML)
 * @param {PortfolioProject[]} projects
 */
function renderProjectCards(container, projects) {
  if (projects.length === 0) {
    container.innerHTML =
      '<p class="project-grid_empty">No projects match your search. Try another keyword.</p>';
    return;
  }

  let html = "";

  projects.forEach((project) => {
    html += `
    <article class="project-card">
      <div class="project-card_media">
        <img
          class="project-card_image"
          src="${escapeHtml(project.imageURL)}"
          width="800"
          height="500"
          alt="${escapeHtml(project.imageAlt)}"
          loading="lazy"
        />
        <span class="project-card_badge">${escapeHtml(project.category)}</span>
      </div>
      <div class="project-card_body">
        <h3 class="project-card_title">${escapeHtml(project.title)}</h3>
        <p class="project-card_description">${escapeHtml(project.description)}</p>
      </div>
      <div class="project-card_actions">
        <a
          class="project-card_button"
          href="${escapeHtml(project.link)}"
          target="_blank"
          rel="noopener noreferrer"
          >${escapeHtml(project.linkLabel)}</a>
      </div>
    </article>`;
  });

  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("project-grid");
  if (!container) {
    return;
  }

  const searchInput = document.getElementById("project-search");

  const applyFilter = () => {
    const query = searchInput ? searchInput.value : "";
    const matched = filterProjectsByQuery(portfolioProjects, query);
    renderProjectCards(container, matched);
  };

  applyFilter();

  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }
});