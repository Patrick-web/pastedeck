<template>
  <div class="paste-card bg-base-color rounded-xl p-5 relative">
    <p v-if="paste.type == 'text'" class="font-light">{{ paste.content }}</p>
    <pre class="font-light"></pre>

    <img
      v-if="paste.type == 'image'"
      class="w-full rounded-xl"
      :src="paste.content"
    />
    <button
      v-if="paste.type == 'text' || paste.type == 'code'"
      class="z-5 rounded-xl hover:rounded-full bg-app-bg absolute top-1 right-1 p-3"
    >
      <img class="w-[10px]" src="../assets/copy-icon.svg" alt="copy icon" />
    </button>
    <button
      v-if="paste.type == 'file' || paste.type == 'image'"
      class="z-5 rounded-xl hover:rounded-full bg-app-bg absolute top-12 right-1 p-3"
    >
      <img
        class="w-[10px]"
        src="../assets/dowload-icon.svg"
        alt="download icon"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    paste: Object,
  },
};
</script>

<style></style>
