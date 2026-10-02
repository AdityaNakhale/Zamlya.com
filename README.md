# Zamlya.com — Developer Portfolios & Technical Shorts Stream

Zamlya.com is a web platform showcasing technical engineering portfolios, full-stack systems architecture, and a curated feed of technical and vlog shorts. Founded and engineered by three BCA friends, the platform combines interactive portfolio dossiers rendered dynamically from CSV data with a synchronized YouTube Shorts stream.

---

## 🚀 Key Features

* **Dynamic CSV Portfolios:** Interactive developer profiles with CV modal viewports rendered directly from structured CSV data.
* **Curated YouTube Shorts Stream:** Live synchronized feed of shorts featuring vertical video playback, modal previews, and YouTube Data API synchronization.
* **Fast Modern Tooling:** Bundled with Vite and built with TypeScript/HTML5 for lightweight, fast static delivery.
* **GitHub Pages Deployment:** Continuous deployment configured directly from the main branch.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript / TypeScript
* **Tooling & Bundler:** Vite
* **Data Source:** CSV Profile Datasets & YouTube Data API v3
* **Hosting:** GitHub Pages

---

## 👥 Core Team

* **Aditya Suresh Nakhale** — CEO & Backend Developer (Node.js, Nest.js, Next.js, PostgreSQL, Prisma ORM, Java)
* **Parth Khadke** — Founder & Full-Stack Developer (Python, JavaScript, MySQL, REST APIs)
* **Ritesh Vilas Janwade** — Co-Founder & Java Developer (Core Java, Spring Boot, Spring MVC, JPA/Hibernate)
* **Raghav Deole** — Digital Marketing & Organic SEO Specialist

---

## 📁 Repository Structure

```text
├── img/                # Profile photos and asset images
├── public/             # Static public assets (icons, metadata)
│   └── favicon.svg     # Project favicon
├── src/                # Core frontend scripts and styles
├── .env.example        # Environment variable template (YouTube API key)
├── index.html          # Main application markup & feed layout
├── metadata.json       # Project configurations
├── package.json        # Dependencies and build commands
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite bundler configuration

```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18.0.0 or higher recommended)
* npm or yarn

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/AdityaNakhale/Zamlya.com.git
cd Zamlya.com

```


2. **Install project dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
```bash
cp .env.example .env

```


Provide your YouTube Data API key inside `.env` if enabling custom API sync.
4. **Launch development server:**
```bash
npm run dev

```


5. **Build for production:**
```bash
npm run build

```



---

## 🌐 Live Website

* **Production URL:** [https://adityanakhale.github.io/Zamlya.com/](https://adityanakhale.github.io/Zamlya.com/)
