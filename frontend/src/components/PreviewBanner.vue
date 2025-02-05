<script setup>
const props = defineProps({
  uri: {
    type: String,
    default: '/'
  }
});

// Handle preview refresh
window.addEventListener('message', (event) => {
  if (event.data === 'preview:refresh') {
    window.location.reload();
  }
});
</script>

<template>
  <div class="preview-banner">
    Preview Mode - <a :href="uri">Exit Preview</a>
  </div>
</template>

<style scoped>
.preview-banner {
  background: #374151;
  color: white;
  padding: 0.5rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
.preview-banner a {
  color: #93c5fd;
  text-decoration: underline;
}
</style> 