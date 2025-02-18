<script setup>
import { computed, ref } from 'vue';
import { craftClient } from '../lib/craft';
import { CREATE_POST_MUTATION } from '../queries/guestbookPosts.mjs';

const props = defineProps({
  authorId: {
    type: Number,
    required: true
  }
});

const message = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

const generateTitle = (text) => {
  const words = text.split(' ').slice(0, 3).join(' ').trim();
  return `Post: ${words}${words ? '...' : ''}`;
};

const title = computed(() => generateTitle(message.value));

const submitPost = async () => {
  if (!message.value.trim()) return;
  
  loading.value = true;
  error.value = '';
  success.value = false;
  
  try {
    const result = await craftClient.query(CREATE_POST_MUTATION, {
      title: title.value,
      message: message.value,
      authorId: props.authorId.toString()
    });

    if (result?.save_guestbookPosts_text_Entry) {
      success.value = true;
      message.value = '';
      window.dispatchEvent(new CustomEvent('post-submitted'));
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form method="post" @submit.prevent="submitPost">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    <div v-if="success" class="text-green-600 mb-4">Message posted successfully!</div>
    
    <div class="mb-6 mt-4">
      <label for="message" class="font-bold">Message</label>
      <textarea 
        name="message" 
        class="w-full px-6 py-4" 
        required 
        id="message" 
        v-model="message"
      ></textarea>
    </div>
    <input 
      type="submit" 
      class="rounded font-bold bg-red-600 text-slate-50 px-6 py-4" 
      value="Post entry" 
      :disabled="loading"
    >
  </form>
</template>