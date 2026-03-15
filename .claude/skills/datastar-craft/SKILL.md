---
name: datastar-craft
description: Datastar + Craft CMS patterns — SSE endpoints, Twig integration, signals, DOM morphing. Use this skill for reactive UI patterns in Craft CMS projects using the putyourlightson/craft-datastar plugin.
version: 1.0.0
---

# Datastar + Craft CMS

Datastar is a lightweight (~11KB) hypermedia framework. In Craft CMS projects it is integrated via the official
`putyourlightson/craft-datastar` plugin by Ben Croker.

The backend drives the frontend. Server renders HTML. Datastar handles reactivity via `data-*` attributes and SSE. No
Vue, no React, no JSON APIs for UI state.

## Philosophy

1. **Server is source of truth** — most state lives in Craft, not the browser
2. **HTML over the wire** — SSE streams HTML fragments, not JSON
3. **Progressive Enhancement** — pages work without JavaScript
4. **Fat Morph** — send large HTML chunks, morphing is efficient
5. **Restrained signals** — only use signals for local UI state (open/closed, input values)

## Anti-Patterns to AVOID

- Optimistic UI updates — confirm state from server only
- Client-side routing — use Craft's native URL structure
- JSON APIs for UI state — stream HTML instead
- Overusing signals — if it belongs on the server, keep it there

## Signal Naming Convention

- Regular signals: sent with every SSE request
- `_`-prefixed signals: local only, NOT sent to backend

## SSE Endpoints

SSE endpoints are Twig templates in `templates/_datastar/`.
Called directly via `datastar.get()` or `datastar.post()` — no route registration needed.

### Calling an Endpoint

```twig
data-on:input__debounce.300ms="{{ datastar.get('_datastar/search.twig', {
    type: type
}) }}"
```

### Endpoint Structure

```twig
{# templates/_datastar/search.twig #}
{% set type = type ?? 'page' %}
{% set search = signals.search ?? null %}

{% set entries = search
    ? craft.entries.section(['blog', 'pages'])
        .search(search)
        .orderBy('score desc, postDate desc')
        .limit(100).all
    : [] %}

{% if entries %}
  {% patchelements %}
    <ul id="search-results">
      {% for entry in entries %}
        {# render results #}
      {% endfor %}
    </ul>
  {% endpatchelements %}
{% else %}
  {% patchelements %}
    <ul id="search-results">
      {# empty state #}
    </ul>
  {% endpatchelements %}
{% endif %}
```

### Key Concepts

- `signals.search` — reads signal value sent from frontend
- `{% patchelements %}` — streams HTML fragment to browser; target element must have matching `id` on the page
- `{% patchsignals %}` — updates signal values from the backend
- `{% executescript %}` — executes JS in browser context
- Multiple `{% patchelements %}` / `{% patchsignals %}` blocks per endpoint are possible

### patchsignals — Update Signals from Backend

```twig
{% patchsignals %}
  {{ {count: entries | length, lastUpdated: now | date('U')} | json_encode }}
{% endpatchsignals %}
```

### executescript — Run JS from Backend

```twig
{% executescript %}
  console.log('Loaded {{ entries | length }} results');
  window.scrollTo(0, 0);
{% endexecutescript %}
```

### DOM Update Modes

```
{% patchelements mode="inner" %}  — replace only inner HTML
{% patchelements mode="prepend" %} — insert before first child
{% patchelements mode="append" %}  — insert after last child
{% patchelements mode="remove" %}  — remove element
{% patchelements %}                — outer (default)
```

## Performance

- Brotli compression on SSE streams — repeated HTML compresses by factors of thousands
- Fat Morph — don't fear large HTML chunks, morphing is efficient
- Debounce inputs: `data-on:input__debounce.300ms`
- Use `data-ignore` to skip elements during morph
- Use `data-indicator` for loading states

## Links

- [Datastar Documentation](https://data-star.dev)
- [craft-datastar Plugin](https://putyourlightson.com/plugins/datastar)
- [Craft Kit Live Demo](https://craft-kit.dev)
- [GitHub](https://github.com/handplant/craftcms-lazy-starter-kit)
