<script setup>

defineProps({
  pages: {
    type: Array,
    default: () => []
  },
  currentPath: {
    type: String,
    default: '/'
  },
  isPreview: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <nav class="sm:tw-basis-2/3 grow-1" aria-label="Primary">
    <ul class="sm:flex">
      <li>
        <a 
          href="/blog" 
          class="block p-2 hover:underline text-red-600 hover:text-red-600"
          :class="{ 'active': currentPath === '/blog' }"
          :aria-current="currentPath === '/blog' ? 'page' : null"
        >
          Blog
        </a>
      </li>
      <li>
        <a 
          href="/guestbook" 
          class="block p-2 hover:underline text-red-600 hover:text-red-600"
          :class="{ 'active': currentPath === '/guestbook' }"
          :aria-current="currentPath === '/guestbook' ? 'page' : null"
        >
          Guestbook
        </a>
      </li>
      <li v-for="page in pages" :key="page.uri">
        <a 
          :href="'/' + page.uri"
          class="block p-2 hover:underline text-red-600 hover:text-red-600"
          :class="{ 
            'active': currentPath === '/' + page.uri,
            'draft': page.draft && isPreview
          }"
          :aria-current="currentPath === '/' + page.uri ? 'page' : null"
        >
          {{ page.title }} {{ page.draft && isPreview ? '(Draft)' : '' }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.active {
  /* Add your active link styles */
  font-weight: bold;
}

.draft {
  opacity: 0.7;
}
.draft::after {
  content: ' (Draft)';
  font-style: italic;
  font-size: 0.9em;
}
</style>