# The Tao of Datastar

The "Datastar way" is a set of opinions from the core team on building maintainable, scalable, high-performance web
apps.

## Foundational Mindset

**Backend-driven architecture**: Most application state should reside on the server, making it the authoritative source
of truth. The frontend is exposed to users and cannot be trusted.

## Core Tenets

### 1. State Management Philosophy

Keep business logic and state decisions on the backend rather than scattering them across frontend JavaScript. This
reduces complexity and ensures consistency.

**DO:**

```html
<!-- Backend controls what's visible -->
<div data-on:click="@post('/toggle-feature')">
  Toggle Feature
</div>
<!-- Backend responds with updated UI -->
```

**DON'T:**

```html
<!-- Don't manage business state in frontend -->
<div data-signals="{featureEnabled: true, userRole: 'admin', permissions: [...]}">
  <!-- Complex frontend state management -->
</div>
```

### 2. Sensible Defaults

The framework ships with recommended configuration settings. Resist the urge to customize before thoroughly questioning
whether such changes are truly necessary.

### 3. DOM Patching Over Fine-Grained Updates

Rather than managing individual element updates, the backend drives frontend changes by patching HTML elements and
signals. This "fat morph" approach sends large DOM chunks efficiently.

**DO:**

```html
<!-- Backend sends entire updated section -->
event: datastar-patch-elements
data: elements
<div id="user-list">
  data: elements
  <div class="user">Alice</div>
  data: elements
  <div class="user">Bob</div>
  data: elements
  <div class="user">Charlie</div>
  data: elements
</div>
```

**DON'T:**

```javascript
// Don't try to surgically update individual items
users.forEach(u => updateUserElement(u.id, u.name));
```

### 4. Morphing as Core Strategy

Morphing ensures only modified parts of the DOM are updated, preserving state and improving performance. This enables
sending substantial HTML trees from the backend while maintaining performance.

### 5. Restrained Signal Usage

Signals should serve specific purposes:

- **User interactions**: toggling visibility, local UI state
- **Form input binding**: connecting inputs to backend requests

**Appropriate signal use:**

```html

<div data-signals="{_menuOpen: false, searchQuery: ''}">
  <button data-on:click="_menuOpen = !_menuOpen">Menu</button>
  <input data-bind:value="searchQuery" data-on:input.debounce_300ms="@get('/search')">
</div>
```

**Overusing signals (anti-pattern):**

```html
<!-- Too much state in frontend -->
<div data-signals="{
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  sortField: 'name',
  sortDirection: 'asc',
  filters: {...}
}">
```

## Key Patterns

### Server-Sent Events (SSE)

Use SSE responses to stream multiple events that patch elements, update signals, and execute scripts without requiring
specialized content types.

### Compression

Leverage compression (particularly Brotli) on SSE streams. Compression ratios of 200:1 are realistic given the
repetitive nature of DOM data.

### CQRS (Command-Query Responsibility Segregation)

Segregate commands (writes) from queries (reads):

- **Long-lived read connections**: Real-time updates
- **Short-lived write requests**: State changes

This enables real-time collaboration patterns.

### Backend Templating

Use server-side templating to generate HTML and maintain DRY principles rather than duplicating logic across frontend
and backend.

### Page Navigation

Embrace standard web patterns:

- Use anchor elements for navigation
- Use redirects from the backend
- Avoid custom history management
- Let browsers handle navigation naturally

## Anti-Patterns to AVOID

### 1. Optimistic Updates

**WRONG:**

```html
<!-- Don't show success before confirmation -->
<div data-on:click="status = 'Saved!'; @post('/save')">
  Save
</div>
```

**RIGHT:**

```html
<!-- Use loading indicator, confirm after response -->
<div data-on:click="@post('/save')" data-indicator="#saving">
  Save
</div>
<span id="saving">Saving...</span>
```

Rather than displaying success messages that might later fail, use loading indicators and confirm outcomes only after
backend verification.

### 2. Assume Stale Frontend State

Don't assume frontend state remains current. Fetch current state from the backend rather than pre-loading and trusting
frontend cache.

**WRONG:**

```html
<!-- Don't trust cached count -->
<div data-signals="{cartCount: 5}">
  <span data-text="cartCount"></span>
</div>
```

**RIGHT:**

```html
<!-- Let backend send current state -->
<div data-on-intersect.once="@get('/cart/count')">
  <span id="cart-count">Loading...</span>
</div>
```

### 3. Custom History Management

Adding complexity through manual browser history manipulation contradicts natural web navigation behavior.

**WRONG:**

```html

<div data-on:click="history.pushState({}, '', '/new-page'); loadPage()">
```

**RIGHT:**

```html
<a href="/new-page">Go to page</a>
<!-- Or let backend redirect -->
```

## User Experience Principles

### Loading Indicators

Use the `data-indicator` attribute to inform users when operations are in progress, providing transparency without
deception.

```html

<button data-on:click="@post('/process')"
        data-indicator="#processing">
  Process
</button>
<div id="processing" style="display:none">
  <span class="spinner"></span> Processing...
</div>
```

### Accessibility

Datastar remains neutral on accessibility. You must:

- Employ semantic HTML
- Apply ARIA appropriately
- Ensure keyboard navigation
- Support screen readers

## Summary

Build collaboratively with the browser and server, respecting their respective strengths while maintaining **backend
authority over application truth**.
