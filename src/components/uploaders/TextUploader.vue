<template>
  <div :class="['paste-box text-paste flex flex-col items-center gap-2']">
    <loader v-if="uploading" />
    <textarea v-model="pasteText" placeholder="Paste or Write text..."
      class="w-full h-full outline-none p-4 font-light bg-primary-light rounded-2xl"></textarea>
  </div>
  <button class="z-5 rounded-xl hover:rounded-[40px] bg-app-bg absolute top-6 right-6 w-10 h-10 drop-shadow"
    @click="pasteClipboard">
    <img class="w-3 icon m-auto" src="../../assets/paste-icon.png" alt="paste icon" />
  </button>
</template>

<script>
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
    async emitText() {
      const paste = {
        id: Math.random() * 1000,
        paste_type: "text",
        text_content: this.pasteText,
        live_paste: true,
      };
      this.uploading = true;
      window.socket.emit("new-paste", paste)
      this.pasteText = "";
      this.uploading = false;
    },

  },
};
</script>

<style lang="scss" scoped></style>
