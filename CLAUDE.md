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
- Colors in oklch: `--color-primary`

## Datastar Skills

- Philosophy: `.claude/skills/datastar-craft/TAO.md`
- Patterns & Craft integration: `.claude/skills/datastar-craft/SKILL.md`
- Attribute reference: `.claude/skills/datastar-craft/REFERENCE.md`

## Plugins

CKEditor, Datastar, Map, Image Resizer, SEOMate, Vite, Craft MCP

## Live Demo

https://craft-kit.dev
