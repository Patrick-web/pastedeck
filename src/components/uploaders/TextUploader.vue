<template>
  <div class="paste-box text-paste flex flex-col items-center gap-2">
    <loader v-if="uploading" />
    <textarea
      v-model="pasteText"
      placeholder="paste or write text..."
      class="w-full h-full outline-none p-2 font-light bg-primary-light rounded-2xl"
    ></textarea>
  </div>
  <button
    class="z-5 rounded-xl hover:rounded-[40px] bg-app-bg absolute top-3 right-6 p-3 drop-shadow"
    @click="pasteClipboard"
  >
    <img
      class="w-[20px] icon"
      src="../../assets/paste-icon.png"
      alt="paste icon"
    />
  </button>
</template>

<script>
import Loader from "../reusables/Loader.vue";
import { uploadTextBasedPaste } from "../../supabase/index.js";

export default {
  data() {
    return {
      pasteText: "",
      uploading: false,
    };
  },
  methods: {
    pasteClipboard() {
      navigator.clipboard.readText().then(
        (clipText) => {
          this.pasteText = clipText.trim();
        },
        (err) => {
          alert(err);
        }
      );
    },
    async uploadText() {
      const paste = {
        type: "text",
        textContent: this.pasteText,
      };
      this.uploading = true;
      const { data, error } = await uploadTextBasedPaste(paste);
      this.pasteText = "";
      this.uploading = false;
      if (error) {
        alert(error.message);
        return;
      }
    },
  },
  components: {
    Loader,
  },
  watch: {
    beginTextUpload() {
      console.log("Uploading Text");
      this.uploadText();
    },
  },
  props: {
    beginTextUpload: Number,
  },
};
</script>

<style lang="scss" scoped></style>
