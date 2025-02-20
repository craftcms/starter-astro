<script setup>
import { ref, onMounted } from 'vue';
import { craftClient } from '../lib/craft';
import { GUESTBOOK_POSTS_QUERY } from '../queries/guestbookPosts.mjs';
import Pagination from './Pagination.vue';

const props = defineProps({
  previewToken: {
    type: String,
    default: null
  },
  initialPosts: {
    type: Array,
    default: () => []
  },
  initialTotalPosts: {
    type: Number,
    default: 0
  },
  initialCurrentPage: {
    type: Number,
    default: 1
  }
});

const posts = ref(props.initialPosts);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(props.initialCurrentPage);
const totalPosts = ref(props.initialTotalPosts);
const itemsPerPage = 4;

const fetchPosts = async (page = currentPage.value) => {
  loading.value = true;
  try {
    const result = await craftClient.query(GUESTBOOK_POSTS_QUERY, {
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage
    }, {
      previewToken: props.previewToken
    });
    
    posts.value = result?.guestbookPostsEntries || [];
    totalPosts.value = result?.entryCount || 0;
    currentPage.value = page;

    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (newPage) => {
  fetchPosts(newPage);
};

const resetToFirstPage = () => {
  fetchPosts(1);
};

onMounted(() => {
  // Listen for new posts
  window.addEventListener('post-submitted', resetToFirstPage);
  
  // Handle browser navigation
  window.addEventListener('popstate', () => {
    const urlPage = new URLSearchParams(window.location.search).get('page');
    fetchPosts(parseInt(urlPage) || 1);
  });
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
        v-if="Math.ceil(totalPosts / itemsPerPage) > 1"
        :currentPage="currentPage"
        :totalPages="Math.ceil(totalPosts / itemsPerPage)"
        @update:currentPage="handlePageChange"
      />
    </div>
    <p v-else class="text-2xl">No entries yet. Create one using the form.</p>
  </div>
</template>