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

- `signals.search` — reads signal value sent from frontend (auto-injected in all Datastar templates)
- `{% patchelements %}` — streams HTML fragment to browser; target element must have matching `id` on the page
- `{% patchsignals %}` — updates signal values from the backend
- `{% executescript %}` — executes JS in browser context
- `{% removeelements %}` — removes DOM elements matching a CSS selector
- `{% location %}` — redirects browser (`window.location`)
- Multiple blocks per endpoint are possible

### patchelements — Stream HTML Fragments

Default mode replaces the outer element (matched by `id`). Custom selector targets any CSS selector.

```twig
{# Default: match by id #}
{% patchelements %}
  <ul id="results">...</ul>
{% endpatchelements %}

{# Custom selector + mode #}
{% patchelements with {selector: '#list', mode: 'append'} %}
  <li>New item</li>
{% endpatchelements %}
```

Modes: `outer` (default), `inner`, `prepend`, `append`, `remove`

### removeelements — Remove DOM Elements

```twig
{% removeelements '#stale-item' %}
```

### patchsignals — Update Signals from Backend

Use when the backend needs to push state to the frontend (counters, pagination info, etc.).
Do NOT use to replace UI updates that should be HTML.

```twig
{# Block syntax #}
{% patchsignals %}
  {{ {count: entries | length, page: 1} | json_encode }}
{% endpatchsignals %}

{# Inline syntax #}
{% patchsignals {count: entries | length, page: 1} %}

{# Only set if signal doesn't exist yet #}
{% patchsignals with {onlyIfMissing: true} %}
  {{ {page: 1} | json_encode }}
{% endpatchsignals %}
```

### executescript — Run JS from Backend

Use sparingly — only for side effects without an HTML equivalent (scroll, focus, analytics).

```twig
{% executescript %}
  window.scrollTo(0, 0);
{% endexecutescript %}

{# With options #}
{% executescript with {autoRemove: true} %}
  console.log('{{ entries | length | escape('js') }} results loaded');
{% endexecutescript %}
```

### location — Redirect from Backend

```twig
{% location craft.app.request.referrer %}
```

## Craft Controller Actions

`datastar.runAction()` executes a Craft controller action and returns a response object — useful for saving entries, users, etc.

```twig
{# templates/_datastar/save-user.twig #}
{% set response = datastar.runAction('users/save-user', {
    userId: signals.userId,
    username: signals.username
}) %}

{% if response.isSuccessful %}
  {% patchelements %}
    <div id="status">Saved!</div>
  {% endpatchelements %}
{% else %}
  {% patchsignals {errors: response.errors} %}
{% endif %}
```

Called via POST (CSRF auto-generated):
```twig
data-on:click="{{ datastar.post('_datastar/save-user.twig') }}"
```

## Forms & POST

Use `datastar.post()` for state-changing actions. Signals are automatically sent as JSON body.

```twig
{# Frontend #}
<form data-signals="{email: '', message: ''}" data-on:submit.prevent="{{ datastar.post('_datastar/contact.twig') }}">
  <input type="email" data-bind:value="email" placeholder="Email">
  <textarea data-bind:value="message"></textarea>
  <button type="submit" data-indicator="#submitting">Send</button>
  <span id="submitting" style="display:none">Sending...</span>
</form>
```

```twig
{# templates/_datastar/contact.twig #}
{% set email = signals.email ?? null %}
{% set message = signals.message ?? null %}

{% if email and message %}
  {# process form... #}
  {% patchelements %}
    <div id="form-result">
      <p>Thanks! We'll be in touch.</p>
    </div>
  {% endpatchelements %}
{% endif %}
```

## Loading States with data-indicator

`data-indicator` creates a boolean signal that is `true` while a request is in progress. Use it to show spinners or disable buttons.

```html
{# Show a spinner element #}
<button data-on:click="{{ datastar.post('_datastar/save.twig') }}"
        data-indicator="#saving">
  Save
</button>
<span id="saving" style="display:none">Saving...</span>

{# Disable button while loading #}
<button data-indicator:fetching
        data-attr:disabled="fetching"
        data-on:click="{{ datastar.get('_datastar/load.twig') }}">
  Load
</button>
```

## Initial Data Loading

Use `data-init` or `data-on-intersect.once` to load data when a component mounts or enters the viewport:

```html
{# Load on mount #}
<div data-init="{{ datastar.get('_datastar/stats.twig') }}">
  <span id="stats">Loading...</span>
</div>

{# Load when visible (lazy loading) #}
<div data-on-intersect.once="{{ datastar.get('_datastar/section.twig') }}">
  <div id="section-content">Loading...</div>
</div>
```

## Security

- **Immer Twig-Escaping** — User-Input in Templates immer escapen
- **Prefer variables over signals** — Template-Variablen (via `datastar.get(..., {var: value})`) sind tamper-proof; Signals kommen vom Browser und können manipuliert werden
- **Server-side validation** — Signal-Werte nie blind vertrauen, immer serverseitig validieren
- **JS-Output escapen** — In `{% executescript %}` Blocks: `{{ value | escape('js') }}`
- **HTML-Attribute in Quotes** — `data-*` Attribute immer in Anführungszeichen zur XSS-Prävention
- `datastar.post()` generiert automatisch einen CSRF-Token

## Performance

- Brotli compression on SSE streams — repeated HTML compresses 200:1 in realistic scenarios
- Fat Morph — don't fear large HTML chunks, morphing is efficient
- Debounce inputs: `data-on:input__debounce.300ms`
- Use `data-ignore` to skip elements during morph entirely
- Use `data-ignore-morph` to preserve content but allow attribute updates (e.g. playing `<video>`)
- Use `data-indicator` for loading states — never optimistic UI

## Links

- [Datastar Documentation](https://data-star.dev)
- [craft-datastar Plugin](https://putyourlightson.com/plugins/datastar)
- [Craft Kit Live Demo](https://craft-kit.dev)
- [GitHub](https://github.com/handplant/craftcms-lazy-starter-kit)
