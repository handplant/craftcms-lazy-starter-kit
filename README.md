# CraftCMS Lazy Starter Kit

CraftCMS Lazy is a Craft CMS 5 starter kit for building fast, maintainable, server-rendered websites with Vite,
Tailwind CSS, Datastar, and DDEV.

It is designed for agencies, freelancers, and developers who believe Craft's entry model is the architecture: sections,
entry types, fields, relations, and templates should be clear before a frontend framework enters the conversation.

The project gives you a practical Craft baseline with real examples for Matrix blocks, CKEditor content,
Datastar-powered interactions, maps, search, SEO, and AI-readable content.

[Live Demo: craft-kit.dev](https://craft-kit.dev)

---

## Stack

Craft CMS + Twig + Datastar + Vite + Tailwind CSS + DDEV

First-class Craft plugins when needed: Formie, Blitz, SeoMatic, and others. This starter includes SEOMate and keeps the
architecture open for project-specific plugin choices.

---

## Principles

### Structure first

Structure is the architecture. In Craft, that structure is built from sections, entry types, fields, and relations. Get
those decisions right and the project stays understandable. Get them wrong and no frontend framework will save the site.

### Everything is an entry

A page is an entry. A blog post is an entry. A card, CTA, accordion item, navigation item, or reusable content block can
also be an entry when that makes the system clearer. Some entries have URLs and sections. Some exist only as related
content. They still share the same modeling, querying, and rendering approach.

CraftCMS Lazy leans into that model: atoms, molecules, organisms, and pages are represented through entries where it
makes sense. Matrix blocks, block components, and entry type templates resolve through Craft's `entry.render()` pattern
from `templates/_partials/entry/`, and relations are loaded with `eagerly()` so developers know where content lives and
how it reaches the page.

### No frontend framework required

Craft and Twig render the HTML. Datastar handles reactivity through HTML attributes and server-sent events. Embla,
Leaflet, and other small libraries are used where they solve a specific browser problem, but Vue, React, hydration, and
JSON APIs are not required for normal UI state.

### Hypermedia over client-side state

The server renders state, the browser displays it, and Datastar morphs the DOM when the server sends new HTML. This
keeps
dynamic interfaces close to Craft's content model instead of moving the application into a separate client-side runtime.

### Local dev, no drama

DDEV and Vite provide a repeatable local environment with hot reload and predictable commands. You can start a project
without writing Docker config from scratch.

### AI-ready by default

The repo includes agent instructions, Claude Code context, MCP configuration, Datastar guidance, and design notes.
The LLM Ready plugin can expose `llms.txt` and entry pages as clean Markdown by appending `.md` to URLs.

### SEO, accessibility, and performance

The starter kit includes SEOMate configuration, server-rendered HTML, progressive enhancement, and a structure that keeps
performance and accessibility concerns close to the templates.

---

## What Is Included

- A Craft CMS 5 project structure built around entries, relations, and `render()`
- Datastar examples for server-rendered reactive UI
- Tailwind CSS v4 and Vite asset workflow
- DDEV local development setup
- SEO, LLM, and AI-assistant tooling
- Demo content for pages, blog, search, maps, and UI blocks

Formie, Blitz, and other first-class Craft plugins can be added when a project needs forms, static caching, or more
specialized production behavior.

---

## Datastar Examples

The demo site includes practical Datastar examples that keep state on the server and update the page with HTML over SSE.
The interactions are progressively enhanced and do not require a client-side application framework.

- [Datastar Search](https://craft-kit.dev/search)
- [Datastar Blog](https://craft-kit.dev/blog-hypermedia-datastar)
- [Rick & Morty API Demo](https://craft-kit.dev/rick-and-morty-datastar)
- [Datastar Leaflet Map](https://craft-kit.dev/map)
- [Datastar Todo List](https://craft-kit.dev/hypermedia-todolist-craft-cms-datastar)

---

## Requirements

- Docker
- DDEV
- Git

Composer, PHP, Node, and npm commands are run through DDEV.

---

## Quick Start

Clone the repository and start the local environment:

```bash
git clone https://github.com/handplant/craftcms-lazy-starter-kit
cd craftcms-lazy-starter-kit
cp .env.example .env

ddev start
ddev composer install
ddev npm install
```

Import the included demo database:

```bash
ddev import-db --file=demo.sql
```

Open the site:

```text
https://craftcms-lazy.ddev.site
```

Craft Control Panel:

```text
https://craftcms-lazy.ddev.site/admin
User: admin
Password: superuser
```

If you want a clean Craft installation instead of the demo content, skip the database import and run:

```bash
ddev craft install
```

---

## Development

Start the Vite dev server:

```bash
ddev node run dev
```

Build production assets:

```bash
ddev node run build
```

The production build writes optimized assets to `web/dist/` and updates the Vite manifest used by Craft.

Run Craft migrations and apply project config when needed:

```bash
ddev craft migrate/all
ddev craft project-config/apply
```

---

## Project Structure

```text
templates/_components/       Dumb UI components, included with `with {} only`
templates/_partials/         Twig partials and entry rendering templates
templates/_partials/entry/   Matrix blocks, block components, and entry type templates
templates/_layouts/          Base layouts
templates/_globals/          Navigation, footer, fonts, favicons
templates/_datastar/         Datastar SSE endpoints and partials
templates/_entry/            Entry route templates
templates/_macros/           Twig macros
templates/_cp/               Control Panel templates
templates/_custom/           Demo pages without section or entry routes
templates/_errors/           Error pages
src/css/                     Tailwind CSS source
src/js/                      JavaScript source
config/                      Craft, Vite, Datastar, and plugin config
modules/craftkit/            Example Craft module
```

---

## Hypermedia-First Architecture

CraftCMS Lazy follows a server-rendered, hypermedia-first approach:

- Craft and Twig render HTML.
- Datastar adds reactivity with `data-*` attributes and SSE.
- UI state is represented in the document and on the server.
- Pages should continue to work without JavaScript where possible.
- Vue, React, and JSON APIs are not required for normal UI state.

Common Datastar attributes used in the project include `data-signals`, `data-on`, `data-bind`, and `data-class`.

---

## LLM-Ready Content

CraftCMS Lazy includes the [LLM Ready Plugin](https://github.com/johnfmorton/craft-llm-ready). It can expose `llms.txt`
for site-level context, and you can append `.md` to entry URLs to get Markdown versions of pages without writing
additional templates.

---

## AI-Assisted Development

The project includes context files for AI-assisted development:

- `AGENTS.md` contains stack, architecture, commands, project conventions, and repo-specific guidance for Codex-style
  coding agents.
- `CLAUDE.md` contains project context for Claude Code.
- `DESIGN.md` documents design direction and interface conventions.
- `.claudeignore` keeps generated and dependency folders out of Claude Code context.
- `.mcp.json` connects Claude Code to the [Craft MCP Plugin](https://github.com/stimmtdigital/craft-mcp).
- `.claude/skills/datastar-craft/` contains Datastar + Craft CMS guidance, patterns, and attribute references.

---

## Demo Assets

This repository includes `/uploads` so the demo works immediately after importing the demo database.

For production projects, move uploaded files to your normal asset storage workflow and add runtime uploads to
`.gitignore`.

---

## Open Source

CraftCMS Lazy is built by [Andi Grether](https://webworker.me) as an open source starter kit for building cleaner,
faster, and more maintainable Craft CMS sites with a hypermedia-first approach.
