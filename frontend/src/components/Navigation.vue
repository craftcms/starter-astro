<script setup>

defineProps({
  pages: {
    type: Array,
    default: () => []
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
          active-class="text-red-600"
          :aria-current="isCurrentPage('/blog') ? 'page' : null"
        >
          Blog
        </a>
      </li>
      <li>
        <a 
          href="/guestbook" 
          class="block p-2 hover:underline text-red-600 hover:text-red-600"
          active-class="text-red-600"
        >
          Guestbook
        </a>
      </li>
      <li v-for="page in pages" :key="page.id">
        <a 
          :to="`/${page.uri}`" 
          class="block p-2 hover:underline text-red-600 hover:text-red-600"
          active-class="text-red-600"
        >
          {{ page.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>