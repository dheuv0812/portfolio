# ⚡ Dhruv Singh — Full-Stack & Engineering Portfolio Hub

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Motion](https://img.shields.io/badge/Motion-12.4-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

**A high-performance, brutalist-meets-cyberpunk engineering portfolio and interactive systems showcase.**  
Built by **Dhruv Singh** — Computer Engineering (Software Option) student at **Toronto Metropolitan University (TMU)**.

[🌐 Live Portfolio](https://github.com/dheuv0812/portfolio) • [💼 LinkedIn](https://linkedin.com/in/dhruv0812) • [🐙 GitHub](https://github.com/dheuv0812) • [📄 Master Resume](https://drive.google.com/file/d/1cJKmsAqZNy6NeFj46CWnpGMhrv9Ovd1a/view?usp=sharing) • [📬 Email](mailto:dhruv.singh@torontomu.ca)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Highlights & Features](#-key-highlights--features)
- [Theme Engine & Skins](#-theme-engine--skins)
- [Featured Engineering Projects](#-featured-engineering-projects)
- [Architecture & Directory Layout](#-architecture--directory-layout)
- [Tech Stack](#-tech-stack)
- [Local Development](#-local-development)
- [Performance & Optimizations](#-performance--optimizations)
- [About Dhruv Singh](#-about-dhruv-singh)
- [License](#-license)

---

## 🔭 Overview

This repository houses the personal portfolio and engineering hub for **Dhruv Singh**. Designed to bridge high-performance full-stack web software with embedded systems, hardware microarchitectures, and robotics, the portfolio blends tactile 3D physics with brutalist typography and dynamic theming.

Every interaction—from the real-time physical lanyard badge simulation to the custom Star Wars lightsaber cursor and theme engine—is engineered with intent, responsiveness, and visual polish.

---

## ✨ Key Highlights & Features

- 🪪 **Interactive 3D ID Badge**:
  - Developed with **React Three Fiber (R3F)**, **Three.js**, and **@react-three/rapier** physics engine.
  - Features real-time elastic physics, dynamic mouse/touch dragging, natural gravitational swing, realistic card depth, and a custom **MeshLine** lanyard strap.
  - High-resolution card badge synchronized with custom photographic textures and verified credentials.

- 🎨 **Multi-Skin Dynamic Theme Engine**:
  - Runtime CSS variable injection powered by `ThemeContext`.
  - Supports instant palette swaps and themed preloader transitions across multiple distinct skins.
  - Fast switcher accessible anywhere via the top dock button or universal keyboard shortcut: `Ctrl + K` / `Cmd + K`.

- ⚔️ **Galactic Immersion & Lightsaber Cursor**:
  - Star Wars-inspired alternative mode complete with custom canvas-based lightsaber trail cursor.
  - Themed crawl preloaders with custom typographic motion and crawl accents.

- ⏱️ **Live Status & Toronto Time Clock**:
  - Live clock synchronized to `America/Toronto` timezone.
  - Real-time availability indicators and status badges displaying active software objectives.

- 📄 **In-App Master Resume Viewer**:
  - Interactive in-tab resume modal previewer.
  - Allows employers and collaborators to inspect credentials, coursework, and co-op milestones without leaving the page.

- 📊 **GitHub Activity Graph**:
  - Live contribution heatmap powered by `react-github-calendar`.
  - Real-time insight into ongoing code commits, open-source repositories, and build activity.

- 📬 **Interactive Contact Deck**:
  - Multi-topic inquiry dispatch (Freelance, Full-time Roles, AI Integration, General Inquiries).
  - One-click email clipboard copy with visual feedback toast and form validation.

---

## 🎨 Theme Engine & Skins

The site features a reactive theming engine that alters color palettes, borders, glowing shadows, text variables, and preloader animations across the entire application:

| Theme Name | Family | Signature Palette | Accent | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Crimson & Cobalt** *(Default)* | Core | `#070A13` Void Black • `#FF2A55` Crimson • `#2563EB` Cobalt | `#FF2A55` | Signature high-contrast brutalist palette with vivid neon accents. |
| **Force (Galactic)** | Galaxy | `#05060F` Deep Space • `#4FC3F7` Lightsaber Blue • `#FF2A55` Sith Red | `#4FC3F7` | Star Wars Jedi aesthetic with crawl intro and lightsaber trails. |
| **Sith Mode** | Galaxy | `#0A0000` Obsidian • `#FF2020` Sith Red • `#2563EB` Imperial Blue | `#FF2020` | Dark side high-energy crimson aesthetic with imperial styling. |

> **Protip**: Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>⌘</kbd> + <kbd>K</kbd> on macOS) anywhere on the site to cycle themes on the fly.

---

## 🚀 Featured Engineering Projects

The portfolio showcases end-to-end projects spanning full-stack web applications, algorithmic optimization, robotics, digital hardware, and integrated circuit simulation:

| Project | Category | Tech Stack | Key Highlights / Metrics |
| :--- | :--- | :--- | :--- |
| **[Brainstormzz](https://github.com/dheuv0812/brainstormzz)** | Full-Stack AI Platform | React, Node.js, OpenAI API, Canvas, Tailwind CSS | Transforms unstructured thoughts into hierarchical mindmaps; 50+ beta users; 98% generation success rate. |
| **[Urban Carpool Matching System](https://github.com/dheuv0812/Urban-Carpool-Matching-System)** | Algorithmic Optimization | Python, Graph Theory, Constraint Satisfaction | Regional geofenced matching algorithm matching 100+ riders/drivers across 15 zones with a 22% average commute reduction. |
| **[Rover Arm Controller & CV Testing](https://github.com/dheuv0812/Rover-Arm-Controller-and-CV-Testing)** | Robotics & Computer Vision | Python, OpenCV, Arduino, TCP/UDP Sockets | Low-latency socket communication framework with automated OpenCV ARUCO marker pose validation suite; 100+ test scenarios executed. |
| **[8-Bit General-Purpose Processor](https://github.com/dheuv0812/8-Bit-General-Purpose-Processor)** | Computer Architecture & FPGA | VHDL, Intel Quartus Prime, ModelSim, FPGA | Synthesized 8-bit CPU microarchitecture with ALU, FSM control unit, instruction decoder, registers, and 7-segment display driver. |
| **[Bookstore Management Application](https://github.com/dheuv0812/BookstoreApplication)** | Desktop Systems & OOP | Java, Java Swing, State Design Pattern | Full inventory and customer management software implementing the State Pattern for dynamic membership tiers and persistent file I/O. |
| **[Three-Stage MOSFET Voltage Amplifier](https://github.com/dheuv0812/three-stage-mosfet-amplifier)** | Analog IC Design & Microelectronics | 180nm CMOS (GlobalFoundries), KiCad, ngspice | Simulated two active-load CS stages and CD buffer meeting 100% of gain, bandwidth, dynamic swing, and power specifications. |

---

## 📁 Architecture & Directory Layout

```
portfolio/
├── public/                     # Static assets, 3D textures, documents
│   ├── lanyard/                # 3D lanyard materials and textures
│   └── Dhruv_Singh_Resume.pdf  # Master engineering resume
├── src/
│   ├── components/             # Reusable UI elements & layouts
│   │   ├── ui/                 # Atomic UI components
│   │   │   ├── BubbleMenu.tsx  # Floating pill navigation with micro-animations
│   │   │   ├── contact.tsx     # Interactive contact section & clipboard utils
│   │   │   ├── Lanyard.tsx     # 3D interactive physics badge (Three.js / R3F)
│   │   │   ├── LightsaberCursor.tsx # Star Wars dynamic trail cursor
│   │   │   ├── Preloader.tsx   # Signature brutalist page entrance preloader
│   │   │   ├── ProfileCard.tsx # Detailed engineering credentials card
│   │   │   ├── ResumeModal.tsx # In-tab PDF resume preview modal
│   │   │   ├── SkinSwitcher.tsx# Theme switcher HUD
│   │   │   └── StarWarsPreloader.tsx # Crawl preloader for galactic skins
│   │   ├── ErrorBoundary.tsx   # React runtime error boundary wrapper
│   │   └── Layout.tsx          # Global shell wrapper (nav, footer, docks)
│   ├── data/                   # Structured data sources (JSON)
│   │   ├── experience.json     # Co-op and employment timelines
│   │   ├── learning.json       # Milestones, learning goals, and awards
│   │   ├── projects.json       # Project deep-dives, specs, and metrics
│   │   └── site.json           # Profile bio, education, links, about deck
│   ├── lib/                    # State contexts, helpers, and utilities
│   │   ├── analytics.ts        # Google Analytics 4 route & interaction tracking
│   │   ├── ThemeContext.tsx    # Global skin state provider
│   │   └── themes.ts           # CSS custom property token definitions
│   ├── pages/                  # Route views (code-split via React.lazy)
│   │   ├── HomePage.tsx        # Hero deck, 3D card, brutalist gauges, status
│   │   ├── ProjectsPage.tsx    # Comprehensive engineering project showcase
│   │   ├── SkillsPage.tsx      # Categorized engineering competencies
│   │   ├── ExperiencePage.tsx  # Co-op timeline & technical achievements
│   │   ├── LearningArchivePage.tsx # Certifications, roadmap, & coursework
│   │   └── NotFoundPage.tsx    # 404 fallback page
│   ├── App.tsx                 # Router definition, preloader orchestration
│   ├── index.css               # Design system tokens, font imports, reset
│   └── main.tsx                # Application root mount
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

---

## 🛠️ Tech Stack

### Core Framework & Build
- **[React 19](https://react.dev/)**: Modern UI library utilizing functional components, hooks, and suspense boundaries.
- **[TypeScript 6](https://www.typescriptlang.org/)**: Strict static typing across all data layers, props, and theme configs.
- **[Vite 8](https://vitejs.dev/)**: Ultra-fast build tool and development server with Hot Module Replacement (HMR).
- **[React Router DOM v7](https://reactrouter.com/)**: Client-side routing with manual scroll restoration.

### Styling & Design System
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Cutting-edge utility-first CSS engine with dynamic CSS custom properties.
- **[Vanilla CSS Custom Properties]**: Real-time theme tokens for backgrounds, borders, glows, and text.
- **Google Fonts**: Modern typography pairing featuring *Cabinet Grotesk*, *Space Grotesk*, and *Inter*.

### 3D Graphics, Physics & Animations
- **[Three.js](https://threejs.org/)** & **[@react-three/fiber](https://r3f.docs.pmnd.rs/)**: Declarative 3D scene rendering in React.
- **[@react-three/rapier](https://github.com/pmndrs/react-three-rapier)**: Real-time rigid-body physics simulation for the lanyard badge.
- **[Motion](https://motion.dev/) (Framer Motion v12)**: Fluid layout transitions, spring physics, and view entry animations.
- **[GSAP](https://gsap.com/)**: High-precision timeline-based animation sequences.
- **[Lenis](https://lenis.darkroom.engineering/)**: Smooth inertial scrolling.

### Analytics & Linting
- **[React GA4](https://github.com/PriceRunner/react-ga4)**: Privacy-conscious Google Analytics 4 integration tracking page views and engagement.
- **[Oxlint](https://oxc.rs/)**: High-speed Rust-based linter enforcing clean code quality.

---

## 💻 Local Development

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/dheuv0812/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
To create an optimized, minified production build:
```bash
npm run build
```
The compiled output will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

### 6. Lint Codebase
```bash
npm run lint
```

---

## ⚡ Performance & Optimizations

- **Route-Level Code Splitting**: All subpages (`/projects`, `/skills`, `/experience`, `/certifications`) are loaded lazily via `React.lazy()` and `Suspense`, ensuring initial bundle size remains lean.
- **Intelligent Preloader Lifecycle**: Preloader screens only render on initial session visits (cached in `sessionStorage`) or during distinct cross-family theme swaps.
- **Instant Scroll Reset**: Global scroll restoration is disabled in favor of an instant `window.scrollTo` hook on route change.
- **Clean Bundle Chunking**: High-weight libraries (such as Rapier physics and Three.js) are isolated in dynamic chunks.

---

## 👤 About Dhruv Singh

- **Education**: BEng in Computer Engineering (Software Option), Toronto Metropolitan University (TMU, 2023–2028).
- **Location**: Toronto, Ontario, Canada.
- **Interests**: Full-stack web architectures, distributed systems, embedded C/microcontrollers, robotics test automation, and AI integration.
- **Profiles**:
  - **LinkedIn**: [linkedin.com/in/dhruv0812](https://linkedin.com/in/dhruv0812)
  - **GitHub**: [github.com/dheuv0812](https://github.com/dheuv0812)
  - **Email**: [dhruv.singh@torontomu.ca](mailto:dhruv.singh@torontomu.ca) / [singhdhruv1109@gmail.com](mailto:singhdhruv1109@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to explore the code, adapt design patterns, and build upon it.
