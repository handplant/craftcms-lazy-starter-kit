<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  endpoint: { type: String, default: '/api' },
  token: { type: String, default: '' },
  limit: { type: Number, default: 6 },
  section: { type: String, default: 'blog' },
})

const entries = ref([])
const categories = ref([])
const filter = ref('')
const loading = ref(false)
const hasMore = ref(true)
const offset = ref(0)

async function fetchGraphQL (query, variables = {}) {
  const res = await fetch(props.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(props.token && { Authorization: `Bearer ${props.token}` }),
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) {
    throw new Error(json.errors[0].message)
  }
  return json.data
}

async function fetchEntries (reset = false) {
  if (loading.value) {
    return
  }
  loading.value = true

  const query = `
    query ($section: [String], $limit: Int, $offset: Int, $category: [QueryArgument]) {
      entries(section: $section, limit: $limit, offset: $offset, relatedTo: $category, orderBy: "date desc") {
        id
        title
        url
        ... on etBlogEntry_Entry {
          headline
          date
          card {
            teaser
            image {
              thumbnail: url(transform: "thumbnail")
              width
              height
              alt
            }
          }
          relationCategories {
            title
          }
        }
      }
    }
  `

  try {
    const data = await fetchGraphQL(query, {
      section: [props.section],
      limit: props.limit,
      offset: reset ? 0 : offset.value,
      category: filter.value ? parseInt(filter.value) : null,
    })

    const newEntries = data?.entries ?? []
    entries.value = reset ? newEntries : [...entries.value, ...newEntries]
    hasMore.value = newEntries.length >= props.limit
    offset.value = reset ? props.limit : offset.value + props.limit
  } catch (err) {
    console.error('GraphQL error:', err.message)
  }
  finally {
    loading.value = false
  }
}

async function fetchCategories () {
  const query = `
    query {
      entries(section: "categories") {
        id
        title
        slug
      }
    }
  `
  try {
    const data = await fetchGraphQL(query)
    categories.value = data?.entries ?? []
  } catch (err) {
    console.error('GraphQL error:', err.message)
  }
}

watch(filter, () => fetchEntries(true))

onMounted(() => {
  fetchCategories()
  fetchEntries(true)
})
</script>

<template>
  <div class="blocks__popout">
    <div v-if="categories.length" class="inline-flex items-center mb-6 space-x-4">
      <select
        v-model="filter"
        class="ui-select"
        :disabled="loading"
        aria-label="Blog-Kategorie filtern"
      >
        <option value="">Show all</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.title }}
        </option>
      </select>
      <div v-if="loading">Loading...</div>
    </div>

    <template v-if="entries.length">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <article v-for="entry in entries" :key="entry.id" class="ui-card relative">
          <span
            v-if="entry.relationCategories?.length"
            class="absolute py-1 px-2 shadow ui-bold -top-3 right-5 bg-black/50 backdrop-blur-sm text-base text-white rounded-sm"
          >
            {{ entry.relationCategories[0].title }}
          </span>

          <div v-if="entry.card.image?.length" class="aspect-video mb-4">
            <img
              :src="entry.card.image[0].thumbnail"
              :width="entry.card.image[0].width"
              :height="entry.card.image[0].height"
              :alt="entry.card.image[0].alt"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div class="space-y-6 p-4">
            <p v-if="entry.date" class="text-base text-primary ui-bold mb-2">
              {{
                new Date(entry.date).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              }}
            </p>
            <h2 class="ui-h5 mb-2">{{ entry.headline }}</h2>
            <div class="prose prose-lg" v-html="entry.card.teaser"></div>
            <a :href="entry.url" class="ui-btn">Read more</a>
          </div>
        </article>
      </div>
    </template>

    <p v-if="!loading && entries.length === 0" class="pt-4 pb-12 text-2xl">
      🫣 No results found.
    </p>

    <div class="mt-6" v-if="hasMore">
      <button @click="fetchEntries(false)" class="ui-btn ui-btn--lg">Load more</button>
    </div>
  </div>
</template>
