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

/**
 * Load project list from data.json (serve over http:// — fetch may fail with file://).
 * @returns {Promise<PortfolioProject[]>}
 */
// Use raw.githubusercontent.com for JSON — /blob/ URLs return HTML, not JSON.
const PROJECT_DATA_URL =
  "https://raw.githubusercontent.com/bm-user/Portfolio/feature/json-writer/Data/data.json";

async function loadProjects() {
  return fetch(PROJECT_DATA_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load data.json (${response.status})`);
      }
      return response.json();
    })
    .then((data) => data.projects);
}

/**
 * @param {HTMLElement} container — #project-grid mount point (cards injected by script)
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

  loadProjects()
    .then((portfolioProjects) => {
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
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML =
        '<p class="project-grid_empty">Could not load projects. Use a local server (e.g. Live Server) so data.json can be fetched.</p>';
    });
});