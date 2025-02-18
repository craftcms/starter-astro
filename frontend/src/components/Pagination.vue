<script setup>
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
          @click="prevPage" 
          v-if="currentPage !== 1" 
          class="text-red-600 cursor-pointer font-bold hover:underline focus:underline"
        >
          ← Previous page ({{ currentPage - 1 }} of {{ totalPages }})
        </button>
      </li>
      <li>
        <button 
          @click="nextPage" 
          v-if="currentPage !== totalPages" 
          class="text-red-600 cursor-pointer font-bold hover:underline focus:underline"
        >
          Next page ({{ currentPage }} of {{ totalPages }}) →
        </button>
      </li>
    </ul>
  </nav>
</template>