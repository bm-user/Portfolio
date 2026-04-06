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
];

/**
 * @param {HTMLElement} container — #project-grid mount point (hard-coded cards removed from HTML)
 * @param {PortfolioProject[]} projects
 */
function renderProjectCards(container, projects) {
  // Clear any existing content (e.g. hard-coded cards in HTML)
  container.replaceChildren();

  projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";

    const media = document.createElement("div");
    media.className = "project-card_media";

    const img = document.createElement("img");
    img.className = "project-card_image";
    img.src = project.imageURL;
    img.alt = project.imageAlt;
    img.width = 800;
    img.height = 500;
    img.loading = "lazy";

    const badge = document.createElement("span");
    badge.className = "project-card_badge";
    badge.textContent = project.category;

    media.append(img, badge);

    const body = document.createElement("div");
    body.className = "project-card_body";

    const titleEl = document.createElement("h3");
    titleEl.className = "project-card_title";
    titleEl.textContent = project.title;

    const desc = document.createElement("p");
    desc.className = "project-card_description";
    desc.textContent = project.description;

    body.append(titleEl, desc);

    const actions = document.createElement("div");
    actions.className = "project-card_actions";

    const cta = document.createElement("a");
    cta.className = "project-card_button";
    cta.href = project.link;
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
    cta.textContent = project.linkLabel;

    actions.appendChild(cta);
    article.append(media, body, actions);
    container.appendChild(article);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("project-grid");
  if (container) {
    renderProjectCards(container, portfolioProjects);
  }
});