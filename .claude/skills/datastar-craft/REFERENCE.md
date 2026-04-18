# Datastar Attributes Reference

All Datastar functionality is accessed through `data-*` attributes on HTML elements.

## Event Handling

### data-on:[event]

Handle DOM events with optional modifiers.

```html
<!-- Basic click -->
<button data-on:click="{{ datastar.post('_datastar/action.twig') }}">Click</button>

<!-- With modifiers -->
<button data-on:click.prevent="{{ datastar.post('_datastar/submit.twig') }}">Submit</button>

<!-- Debounced input -->
<input data-on:input__debounce.300ms="{{ datastar.get('_datastar/search.twig') }}">

<!-- Window-level events -->
<div data-on:keydown__window="handleKey(evt)">

  <!-- Multiple events -->
  <input data-on:focus="highlight()" data-on:blur="unhighlight()">
```

**Modifiers:**

- `__once` — Fire only once
- `__passive` — No preventDefault (better scroll performance)
- `__capture` — Capture phase
- `__prevent` — Call preventDefault()
- `__stop` — Call stopPropagation()
- `__outside` — Trigger when event is outside element (e.g. click outside to close)
- `__debounce.300ms` — Debounce (append `.leading` or `.notrailing`)
- `__throttle.300ms` — Throttle (append `.noleading` or `.trailing`)
- `__window` — Listen on window instead of element
- `__delay.500ms` — Delay execution
- `__viewtransition` — Wrap in View Transition API

### data-on-intersect

Trigger when element enters viewport.

```html

<div data-on-intersect="{{ datastar.get('_datastar/section.twig') }}">
  Loading...
</div>

<!-- Fire only once -->
<div data-on-intersect.once="{{ datastar.get('_datastar/analytics.twig') }}">
```

### data-on-interval

Trigger at regular intervals (default: 1s).

```html
<div data-on-interval="{{ datastar.get('_datastar/status.twig') }}">
  Status: <span id="status">Loading...</span>
</div>

<!-- Custom interval -->
<div data-on-interval__duration.5s="{{ datastar.get('_datastar/poll.twig') }}">
```

**Modifiers:** `__duration.Xms|Xs(.leading)`, `__viewtransition`

### data-on-signal-patch

Trigger when any signal changes.

```html

<div data-on-signal-patch="console.log('Signal changed')">
```

### data-on-signal-patch-filter

Trigger when specific signals change.

```html

<div data-on-signal-patch-filter="count"
     data-on-signal-patch="handleCountChange()">
```

## State Management

### data-signals

Define reactive signals (state). Signal names use camelCase.

```html
<!-- Object syntax -->
<div data-signals="{count: 0, name: '', items: []}">

<!-- Key suffix syntax (single signal) -->
<div data-signals:count="0">

<!-- Nested / scoped signals -->
<div data-signals="{ui: {searchOpen: false, navOpen: false}}">
<div data-signals:ui.searchOpen="false">

<!-- Dynamic key (Twig) — scopes per entry instance -->
<div data-signals="{{ {('app' ~ entry.id): {filter: ''}} | json_encode }}">

<!-- Underscore prefix = local only (not sent to backend) -->
<div data-signals="{_locations: [], ui: {search: ''}}">

<!-- Only patch if signal doesn't exist yet -->
<div data-signals:count__ifmissing="0">
```

Access nested signals with dot notation:
```html
<span data-text="$ui.searchOpen"></span>
<input data-bind:ui.search>
<button data-on:click="$ui.navOpen = false">
```

### data-json-signals

Define signals from JSON (useful for server-rendered initial state).

```html

<div data-json-signals='{"user": {"name": "Alice", "id": 123}}'>
```

### data-bind:[attr]

Two-way binding between element attribute and signal.

```html
<!-- Input value -->
<input type="text" data-bind:value="username">

<!-- Shorthand — signal name matches input name -->
<input type="text" name="search" data-bind:search>

<!-- Checkbox -->
<input type="checkbox" data-bind:checked="agreed">

<!-- Select -->
<select data-bind:value="country">
  <option value="us">USA</option>
  <option value="uk">UK</option>
</select>
```

### data-computed

Derived/computed values from signals. Read-only — use `data-effect` for side effects.

```html
<!-- Key form (single) -->
<div data-computed:total="price * quantity"></div>

<!-- Multiple -->
<div data-computed="{total: () => price * quantity, tax: () => total * 0.2}"></div>

<span data-text="total"></span>
```

### data-init

Initialize/run code when element loads.

```html

<div data-init="{{ datastar.get('_datastar/initial.twig') }}">
```

### data-effect

Run side effects when dependencies change.

```html

<div data-effect="console.log('Count is now:', count)">
```

## DOM Updates

### data-text

Set element's text content.

```html
<span data-text="username">placeholder</span>
<span data-text="`Hello, ${name}!`">placeholder</span>
```

### data-show

Conditionally show/hide element.

```html

<div data-show="isLoggedIn">Welcome back!</div>
<div data-show="items.length > 0">You have items</div>
```

### data-class

Dynamically add/remove classes.

```html
<!-- Object syntax -->
<div data-class="{'active': isActive, 'disabled': isDisabled}">

  <!-- String syntax -->
  <div data-class="isActive ? 'active' : 'inactive'">
```

### data-attr:[attribute]

Set any attribute dynamically.

```html

<button data-attr:disabled="isSubmitting">Submit</button>
<img data-attr:src="imageUrl">
<a data-attr:href="linkUrl">Link</a>
```

### data-style:[property]

Set inline styles.

```html

<div data-style:color="textColor">
  <div data-style:display="isVisible ? 'block' : 'none'">
```

### data-ref

Create a reference to the element.

```html
<input data-ref="searchInput">
<button data-on:click="$refs.searchInput.focus()">Focus</button>
```

## Morphing Control

### data-ignore

Skip element during all morphing operations.

```html

<div data-ignore>
  <!-- This content never changes from morphs -->
</div>
```

### data-ignore-morph

Preserve element content across morphs but allow attribute updates.

```html

<video data-ignore-morph>
  <!-- Video keeps playing during morphs -->
</video>
```

### data-preserve-attr:[attr]

Keep specific attribute values during morph.

```html
<input data-preserve-attr:value>
```

## Loading States

### data-indicator

Show element while request is in progress.

```html

<button data-on:click="{{ datastar.post('_datastar/save.twig') }}"
        data-indicator="#saving-indicator">
  Save
</button>
<span id="saving-indicator" style="display:none">Saving...</span>

<!-- Shorthand -->
<input data-indicator:fetching>
```

## Pro Attributes (Datastar Pro)

- `data-animate` - Animation helpers
- `data-custom-validity` - Form validation
- `data-on-raf` - requestAnimationFrame triggers
- `data-on-resize` - Resize observer triggers
- `data-persist` - Persist signals to storage
- `data-query-string` - Sync with URL query params
- `data-replace-url` - Update URL without navigation
- `data-scroll-into-view` - Scroll element into view
- `data-view-transition` - View transition API helpers

## Backend Actions

`datastar.get()` / `datastar.post()` in Craft render to `@get()` / `@post()` etc. — the official Datastar action syntax. Actions send current signals as request body.

### Options

```html
<!-- Send only specific signals -->
<button data-on:click="@get('/search', {filterSignals: {include: /^search/}})">

<!-- Form content-type instead of JSON -->
<form data-on:submit.prevent="@post('/submit', {contentType: 'form'})">

<!-- Custom headers -->
<button data-on:click="@post('/api', {headers: {'X-CSRF-Token': csrfToken}})">

<!-- Keep SSE connection alive when tab is hidden -->
<div data-on-interval="@get('/live', {openWhenHidden: true})">
```

### Other Actions

```html
<!-- Set all matching signals at once -->
<button data-on:click="@setAll(false, {include: /^is/})">Close all</button>

<!-- Toggle all matching boolean signals -->
<button data-on:click="@toggleAll({include: /^is/})">Toggle all</button>

<!-- Access signal without triggering reactivity -->
<div data-text="count + @peek(() => total)"></div>
```

## Expression Syntax

Expressions in attributes support JavaScript with access to:

- All signals as variables
- `evt` - Event object in `data-on:*` handlers (use `evt.target` for the element)
- `$refs` - Element references

```html

<div data-signals="{count: 0}">
  <button data-on:click="count++">+1</button>
  <button data-on:click="count = count * 2">Double</button>
  <span data-text="`Count: ${count}`"></span>
</div>
```
