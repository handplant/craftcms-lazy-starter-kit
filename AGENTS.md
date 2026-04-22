# CraftCMS Lazy Starter Kit

## Stack

Craft CMS 5, Twig, Datastar, Tailwind CSS v4, Vite, DDEV, PHP

## Architecture

Hypermedia-first. No Vue, no React, no JSON APIs for UI state.
Server renders HTML. Datastar handles reactivity via `data-*` attributes and SSE.
Progressive Enhancement — pages work without JavaScript.

## Commands

- `ddev start` — start local environment
- `ddev node run dev` — start Vite dev server
- `ddev node run build` — production build
- `ddev craft migrate/all` — run migrations
- `ddev craft project-config/apply` — apply project config

## Project Structure

- `templates/_components/` — page section components (used in content builder)
- `templates/_partials/` — Matrix block templates (auto-resolved via `render()`)
- `templates/_partials/entry/` — block-level partials (blockText, blockCards, etc.)
- `templates/_layouts/` — base layouts
- `templates/_globals/` — global includes (nav, footer)
- `templates/_datastar/` — SSE endpoints and Datastar partials
- `templates/_entry/` — entry type templates
- `templates/_errors/` — error pages
- `src/css/` — Tailwind CSS source
- `src/js/` — JavaScript source
- `config/` — Craft config files
- `modules/craftkit/` — example module (field instance overview)

## Config Files

- `config/general.php` — main Craft config
- `config/routes.php` — custom routes
- `config/vite.php` — Vite plugin config
- `config/datastar.php` — Datastar plugin config
- `config/seomate.php` — SEOMate config

## Conventions

- Datastar signals: `data-signals`, `data-on`, `data-bind`, `data-class`
- SSE endpoints live in `templates/_datastar/`
- Components use `{% include %}` with explicit `with { } only`
- Tailwind v4 custom properties defined in `src/css/app.css`

## Design System

Custom color tokens (semantic, not numbered shades):
- `ink` / `ink-on` / `ink-dim` — dark text, hover, muted
- `pop` / `pop-on` / `pop-dim` — accent (orange), hover, light bg
- `canvas` — component surface (cards, inputs, nav)
- `bg` — page background (body)

Custom utilities: `ui-neo`, `ui-border`, `ui-shadow`, `ui-shadow-sm`, `ui-shadow-lg`, `ui-shadow-pop`, `ui-lift`, `ui-btn`, `ui-card`, `ui-link`, `ui-bold`, `ui-h1`–`ui-h5`, `ui-teaser`, `ui-spacer`

## Breakpoints

- `switch` (`1280px`) — main layout breakpoint used for nav (mobile menu vs desktop nav). Use `switch:` prefix in Tailwind classes e.g. `switch:flex switch:hidden`
- Standard: `2xs` (384px), `xs` (480px), `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` (1840px)

## Datastar Skills

- Philosophy: `.Codex/skills/datastar-craft/TAO.md`
- Patterns & Craft integration: `.Codex/skills/datastar-craft/SKILL.md`
- Attribute reference: `.Codex/skills/datastar-craft/REFERENCE.md`

## Plugins

CKEditor, Datastar, Map, Image Resizer, SEOMate, Vite, Craft MCP

## Live Demo

https://craft-kit.dev
