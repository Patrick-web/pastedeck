<template>
  <div
    :class="[
      copied ? 'bg-green-300' : 'bg-base-color',
      'paste-card rounded-xl p-5 relative',
    ]"
  >
    <p v-if="paste.paste_type == 'text'" class="font-light break-all">
      {{
        paste.text_content.length > 200
          ? paste.text_content.substring(0, 200) + "...."
          : paste.text_content
      }}
    </p>
    <pre v-if="paste.paste_type == 'code'" class="font-light">{{
      paste.text_content
    }}</pre>

    <img
      v-if="paste.paste_type == 'image'"
      class="w-full rounded-xl"
      :src="paste.file_url"
    />
    <button
      @click="copyToClipboard"
      v-if="paste.paste_type == 'text' || paste.type == 'code'"
      :class="[
        copied ? 'bg-green-200' : 'bg-app-bg',
        'z-5 rounded-xl hover:rounded-full absolute lg:top-1 lg:bottom-auto bottom-2 right-2 p-3',
      ]"
    >
      <img class="w-[10px]" src="../assets/copy-icon.svg" alt="copy icon" />
    </button>
    <button
      @click="downloadFile"
      v-if="paste.paste_type == 'file' || paste.paste_type == 'image'"
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
  data() {
    return {
      copied: false,
    };
  },
  props: {
    paste: Object,
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.paste.text_content).then(
        () => {
          this.copied = true;
          setTimeout(() => {
            this.copied = false;
          }, 200);
        },
        () => {
          alert("Error copying");
        }
      );
    },
    downloadFile() {},
  },
};
</script>

<style></style>
