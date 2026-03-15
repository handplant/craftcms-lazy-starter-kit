# 🚀 CraftCMS Lazy Starter Kit

A modern, production-ready Craft CMS Starter Kit with Vite, Tailwind, Datastar and DDEV —
perfect for agencies and freelancers who want to build clean and fast Craft sites.

---

## 🧩 Overview

This starter kit helps developers quickly spin up clean and maintainable Craft CMS projects.

It includes ready-made examples for Matrix Blocks, CKEditor integration, and Datastar Hypermedia-driven
Blog, Map, and Search demos — all server-rendered, reactive, and built without JavaScript frameworks.

This boilerplate demonstrates a **clean, scalable, and modern Craft CMS setup** — perfect for **agencies, freelancers**,
and **developers** who want a production-ready foundation for new Craft projects.

### Live Demo: [craft-kit.dev](https://craft-kit.dev)

### ⚡ Datastar-Powered Hypermedia Examples

Craft Kit includes multiple real-world Datastar demos that showcase server-synchronized state, reactive UI updates, and
seamless Craft integration — all without a JavaScript build step. Explore how Datastar and a **Hypermedia-driven
approach** transform Craft CMS into a reactive, declarative, and API-friendly platform:

- 🔍 **Datastar Search** – https://craft-kit.dev/search
- 📝 **Datastar Blog** – https://craft-kit.dev/blog-datastar
- 🧪 **Rick & Morty API Demo** – https://craft-kit.dev/rick-and-morty-datastar
- 🗺️ **Datastar Leaflet Map** – https://craft-kit.dev/map

---

## 🧠 Built with Modern Tools

- ⚙️ **Craft CMS 5** – latest version with flexible content modeling
- ⚡ **Vite** – fast bundling and instant reloads
- 🧩 **DDEV** – reproducible local development environment
- 🚀 **Datastar** – lightweight, reactive frontend for **Hypermedia-driven** dynamic UIs
- 🗺️ **Leaflet** – interactive, data-driven maps with clustering and live filtering
- 🎨 **Tailwind CSS** – utility-first styling with CSS variables
- 🎞️ **Anime.js** – smooth element animations and scroll-based transitions
- 🛞 **Embla Carousel** – ultra-smooth, touch-friendly sliders with full customization
- 🗃️ **Craft eagerly() + render()** – optimized queries, automatic block templates, and smart caching
- 🧾 **SEO-Ready JSON-LD Organization Schema** – structured data for Google Rich Results
- 🔍 **SEO Meta, Open Graph & Sitemap** – via SEOMate
- 🧰 Field Usage Utility – overview of all fields + their Entry Type instances
- 🔌 **Plugins:** CKEditor, Datastar, Map, Image Resizer, SEOMate, Vite, Craft MCP

---

## 🤖 AI-Assisted Development

Craft Kit ships with a ready-made **Claude Code** setup for AI-assisted development — no configuration needed.

### Included

- **`CLAUDE.md`** – project context for Claude Code: stack, architecture, conventions, folder structure
- **`.claudeignore`** – keeps Claude Code focused on relevant files, ignores `vendor/`, `node_modules/`, `storage/` etc.
- **`.mcp.json`** – connects Claude Code to the [Craft MCP Plugin](https://github.com/stimmtdigital/craft-mcp) for
  direct access to your Craft installation
- **`.claude/skills/datastar-craft/`** – Datastar + Craft CMS skill set:
  - `SKILL.md` – SSE endpoints, Twig integration, signals, common patterns
  - `REFERENCE.md` – complete `data-*` attribute reference
  - `TAO.md` – Datastar philosophy and architecture principles

---

### 🤝 Open Source

This boilerplate is open for everyone — built by [Andi Grether](https://webworker.me) to help developers build faster,
cleaner, and more maintainable Craft CMS sites using a **Hypermedia-first** approach.

## ⚙️ Quick Start

Get up and running with **CraftCMS Lazy** in just a few steps.

```bash
# Clone the repository
git clone https://github.com/handplant/craftcms-lazy-starter-kit
cd craftcms-lazy-starter-kit

# Copy the environment file
cp .env.example .env

# Start DDEV and install dependencies
ddev start
ddev composer install
ddev npm install

# Import the included demo database
ddev import-db --file=demo.sql

# Admin Login
User: admin  
Password: superuser
```

Then open your site at: 👉 https://craftcms-lazy.ddev.site

---

💡 If you don’t import the demo database, you’ll start with a clean _Craft CMS Lazy_ installation.

```
ddev craft install
```

### 🧰 Development

Start the local dev server with Vite:

```bash
ddev node run dev
```

### 🏗️ Production Build

When you’re ready to build the production assets:

```bash
ddev node run build
```

This will generate the optimized files in the web/dist/ directory and update the manifest.json for Craft’s Vite
integration.

### 🖼️ Demo Assets

This repo includes `/uploads` in version control so the starter kit works out of the box.  
In production, these should be added to `.gitignore`.
