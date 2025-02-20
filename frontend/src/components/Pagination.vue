<script setup>
import { getPaginationData } from '../lib/pagination';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:currentPage']);

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};
</script>

<template>
  <nav class="pt-6 text-sm" role="navigation" aria-label="Entry pagination">
    <ul class="flex justify-between">
      <li>
        <button 
          v-if="currentPage !== 1"
          @click="prevPage"
          class="text-red-600 cursor-pointer font-bold hover:underline focus:underline"
          aria-label="Previous Page"
        >
          ← Previous page ({{ currentPage - 1 }} of {{ totalPages }})
        </button>
      </li>
      <li>
        <button 
          v-if="currentPage !== totalPages"
          @click="nextPage"
          class="text-red-600 cursor-pointer font-bold hover:underline focus:underline"
          aria-label="Next Page"
        >
          Next page ({{ currentPage }} of {{ totalPages }}) →
        </button>
      </li>
    </ul>
  </nav>
</template> 