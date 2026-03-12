# Changelog

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
