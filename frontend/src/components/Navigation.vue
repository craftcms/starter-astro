<script setup>

defineProps({
  pages: {
    type: Array,
    default: () => []
  },
  currentPath: {
    type: String,
    default: '/'
  }
})

const renderPageLink = (page) => {
  return {
    href: `/${page.uri}`,
    title: page.title,
    isActive: currentPath === `/${page.uri}`
  }
}

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
      <template v-for="page in pages" :key="page.id">
        <li>
          <a 
            :href="`/${page.uri}`"
            class="block p-2 hover:underline text-red-600 hover:text-red-600"
            :class="{ 'active': currentPath === `/${page.uri}` }"
            :aria-current="currentPath === `/${page.uri}` ? 'page' : null"
          >
            {{ page.title }}
          </a>
          <!-- Render child pages if they exist -->
          <ul v-if="page.children && page.children.length" class="pl-4">
            <li v-for="child in page.children" :key="child.id">
              <a 
                :href="`/${child.uri}`"
                class="block p-2 hover:underline text-red-600 hover:text-red-600"
                :class="{ 'active': currentPath === `/${child.uri}` }"
                :aria-current="currentPath === `/${child.uri}` ? 'page' : null"
              >
                {{ child.title }}
              </a>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
.active {
  /* Add your active link styles */
  font-weight: bold;
}
</style>