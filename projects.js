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
