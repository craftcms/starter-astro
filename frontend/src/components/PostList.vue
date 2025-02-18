<script setup>
import { ref, onMounted, computed } from 'vue';
import { craftClient } from '../lib/craft';
import { GUESTBOOK_POSTS_QUERY } from '../queries/guestbookPosts.mjs';
import Pagination from './Pagination.vue';

const props = defineProps({
  previewToken: {
    type: String,
    default: null
  }
});

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const totalPosts = ref(0);
const itemsPerPage = 4;

const fetchPosts = async () => {
  loading.value = true;
  try {
    const result = await craftClient.query(GUESTBOOK_POSTS_QUERY, {
      limit: itemsPerPage,
      offset: (currentPage.value - 1) * itemsPerPage
    }, {
      previewToken: props.previewToken
    });
    
    posts.value = result?.guestbookPostsEntries || [];
    totalPosts.value = result?.entryCount || 0;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const totalPages = computed(() => 
  Math.ceil(totalPosts.value / itemsPerPage)
);

const updatePage = (newPage) => {
  currentPage.value = newPage;
  fetchPosts();
  
  // Update URL
  const url = new URL(window.location);
  url.searchParams.set('page', newPage);
  window.history.pushState({}, '', url);
};

onMounted(() => {
  // Listen for new posts
  window.addEventListener('post-submitted', fetchPosts);
  
  // Get initial page from URL
  const urlPage = new URLSearchParams(window.location.search).get('page');
  if (urlPage) {
    currentPage.value = parseInt(urlPage);
  }
  
  fetchPosts();
});
</script>

<template>
  <div v-if="loading" class="py-4">
    Loading...
  </div>
  
  <div v-else-if="error" class="py-4 text-red-600">
    {{ error }}
  </div>
  
  <div v-else>
    <div v-if="posts.length > 0">
      <ol class="mb-2 divide-y divide-slate-300">
        <li v-for="post in posts" :key="post.id">
          <article class="text-xl py-6">
            <div v-html="post.textBlock"></div>
            <p class="text-sm mt-1">
              <time :datetime="post.postDate">{{ post.postDate }}</time>
            </p>
          </article>
        </li>
      </ol>
      <Pagination
        v-if="totalPages > 1"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="updatePage"
      />
    </div>
    <p v-else class="text-2xl">No entries yet. Create one using the form.</p>
  </div>
</template>