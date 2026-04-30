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

- `templates/_components/` — dumb UI components (button, image, media, spinner), no logic, always `{% include %}` with
  `with {} only`
- `templates/_partials/` — Twig partials; Matrix block templates auto-resolved via `entry.render()`
- `templates/_partials/entry/` — block and component templates, named by prefix:
  - `block*` — full Matrix block sections (e.g. `blockText`, `blockCards`)
  - `comp*` — sub-components within blocks (e.g. `compCard`, `compButton`)
  - `et*` — entry type templates (e.g. `etBlogEntry`, `etPage`)
- `templates/_layouts/` — base layouts
- `templates/_globals/` — global includes (nav, footer, fonts, favicons)
- `templates/_datastar/` — SSE endpoints and Datastar partials
- `templates/_entry/` — entry type route templates
- `templates/_macros/` — Twig macros (e.g. Datastar helpers)
- `templates/_cp/` — Control Panel (backend) templates
- `templates/_custom/` — demo pages without section/entry (community examples)
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
- Components use `{% include %}` with explicit `with {} only`
- Tailwind v4 custom properties defined in `src/css/app.css`

## Craft Queries

```twig
{# Default — always use eagerly() to avoid N+1 #}
{% set entries = craft.entries()
  .section('blog')
  .limit(10)
  .eagerly()
  .all() %}

{# Render a Matrix block — auto-resolves template in _partials/entry/ #}
{{ entry.render() }}

{# Single entry #}
{% set item = craft.entries().section('news').id(id).one() %}
```

## Design System

Custom color tokens (semantic, not numbered shades):

- `ink` / `ink-on` / `ink-dim` — dark text, hover, muted
- `pop` / `pop-on` / `pop-dim` — accent (orange), hover, light bg
- `canvas` — component surface (cards, inputs, nav)
- `bg` — page background (body)

Custom utilities: `ui-neo`, `ui-border`, `ui-shadow`, `ui-shadow-sm`, `ui-shadow-lg`, `ui-shadow-pop`, `ui-lift`,
`ui-btn`, `ui-card`, `ui-link`, `ui-bold`, `ui-h1`–`ui-h5`, `ui-teaser`, `ui-spacer`

## Breakpoints

- `switch` (`1280px`) — main layout breakpoint for nav (mobile vs desktop). Use `switch:` prefix e.g.
  `switch:flex switch:hidden`
- Standard: `2xs` (384px), `xs` (480px), `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` (1840px)

## Datastar Skills

- Philosophy: `.claude/skills/datastar-craft/TAO.md`
- Patterns & Craft integration: `.claude/skills/datastar-craft/SKILL.md`
- Attribute reference: `.claude/skills/datastar-craft/REFERENCE.md`

## Plugins

CKEditor, Datastar, Map, Image Resizer, SEOMate, Vite, Craft MCP, LLM Ready

## Live Demo

https://craft-kit.dev
