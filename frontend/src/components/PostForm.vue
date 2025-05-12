<script setup>
import { computed, ref } from 'vue';
import { craftClient } from '../lib/graphql';
import { CREATE_POST_MUTATION } from '../queries/post.mjs';

const message = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

const props = defineProps({
  authorId: {
    type: Number,
    required: true
  }
});

const generateTitle = (text) => {
  const words = text.split(' ').slice(0, 3).join(' ').trim();
  return `Post: ${words}${words ? '...' : ''}`;
};

const title = computed(() => generateTitle(message.value));

const submitPost = async () => {
  if (!message.value.trim()) {
    console.error('Message is required');
    return;
  }
  
  loading.value = true;
  try {
    const result = await craftClient.query(CREATE_POST_MUTATION, {
      title: title.value,
      message: message.value,
      authorId: props.authorId.toString()
    }, {
      private: true
    });

    if (!result?.save_guestbookPosts_text_Entry) {
      throw new Error('No data returned from the mutation');
    }

    success.value = true;
    message.value = '';
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('post-submitted'));
    
    // Navigate to first page with a full page load
    window.location.replace('/guestbook?page=1');
    
  } catch (err) {
    error.value = `Error posting message: ${err.message}`;
    console.error('Error creating post:', err);
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