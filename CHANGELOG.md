# Changelog

## [3.2.0] – 2026-11-13

### Changed

- Replaced the named-column page layout grid with a single `ui-container`; the map demo remains full width.
- Introduced readable block classes: `ui-block` for Matrix, `ui-inline` for CKEditor, and shared type classes such as `ui-block-text`.
- Preserved separate Matrix and CKEditor rendering contexts, including `classWrapper` and `classContent` customization.
- Consolidated layout and Datastar result styles into `_components.css`.
- Removed Embla's four-column breakpoint at 1536px; slides remain half-width from the medium breakpoint upward.
- Updated Craft CMS to 5.12.1, Craft plugins, Tailwind CSS to 4.3.5, Vite to 8.3.8, and frontend tooling.
- Refreshed the demo database and production assets.

### Fixed

- Corrected image transform formats and MIME types, with support checks for WebP and AVIF.
- Fixed responsive image width descriptors and duplicate candidates when upscaling is disabled.
- Matched intrinsic image dimensions to ratio-based crops and retained a valid `imgOnly` fallback without JPEG sources.
- Applied object-fit styling to untransformed images and safely escaped image attributes.
- Corrected the documented Vite development and build commands to use `ddev npm run`.

### Removed

- Legacy layout width classes and grid configuration, plus the grid demo, route, and sitemap entry.
- Rick & Morty page and Datastar endpoint, including its route, sitemap entry, README link, and CSS rules.
- Craft MCP plugin and its obsolete configuration; Feed Me remains for the Bitcoin and GitHub Datastar examples.

## [3.1.0] – 2026-04-18

### Updated

- Upgraded to **Datastar 1.0.0** stable
- Refactored all signals to use scoped namespaces for cleaner state management and collision prevention
- Consistent indicator naming convention across all components

### Added

- **`urlSync` Twig macro** — syncs Datastar signals with URL query params, enabling shareable URLs with progressive enhancement. Server reads params on initial render to avoid content flash.

### Fixed

- Various compatibility fixes for Datastar 1.0.0 breaking changes
- Improved stability of external API integrations

## [3.0.0] – 2026-03-16

### Changed

- Full Neobrutalism redesign
- Added new Block "Features"

## [2.0.0] – 2026-03-12

### Changed

- Removed Vue 3 Web Components — project focus is now purely Hypermedia-first
- Removed Blog Native in favor of the Datastar Hypermedia Blog
- Removed GraphQL integration
- Removed unnecessary node modules

### Notes

- Leaner setup, less dependencies, clearer stack
- This release intentionally removes complexity in favor of a clear, maintainable stack
- The Datastar + Twig + SSE approach is now the single recommended pattern

## [1.4.0] – 2025-11-26

### Added

- Installed **FeedMe** for simple external API consumption.
- New **Rick & Morty landing page** showcasing Datastar-based API filtering.
- Datastar integration for **server-driven API updates** using FeedMe JSON feeds.
- Added custom **site routes** for new landing pages (Rick & Morty, grid layout demo).
- Added custom routes to seomate sitemap.xml

## [1.3.0] – 2025-11-07

### Added

- map plugin integration
- Leaflet setup for interactive maps
- Datastar-driven map template with live updates and clustering
- custom popup component (title, category, preview image, link)

## [1.2.0] – 2025-10-22

- Added support for a second-level navigation using Datastar signals.
- Implemented dropdown toggle behavior for nested menu items.
- Improved markup and transitions for a smoother UX across devices.
- Refined active state detection for parent items when a child is active.

## [1.1.0] - 2025-10-21

### Added

- ✨ **Code Field Plugin** for better code input in the CMS.
- 🧱 New **Builder Block: `Code`** for flexible code rendering on the frontend.
- 🪄 Syntax highlighting using **Highlight.js** (supports Twig, Bash & Vue/JS).

### Notes

- Code snippets are now automatically highlighted client-side.
- Ideal for technical blog posts and documentation.

## [1.0.0] - 2025-09-10

Initial release of the CraftCMS Lazy Starter Kit.
