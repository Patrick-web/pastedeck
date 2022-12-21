<template>
  <div class="paste-box code-paste flex flex-col items-center gap-2">
    <loader v-if="uploading" />
    <textarea
      v-model="pasteCode"
      placeholder="paste or write code..."
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
      pasteCode: "",
      uploading: false,
    };
  },
  methods: {
    pasteClipboard() {
      navigator.clipboard.readText().then(
        (clipText) => {
          this.pasteCode = clipText.trim();
        },
        (err) => {
          alert(err);
        }
      );
    },
    async uploadCode() {
      const paste = {
        type: "code",
        textContent: this.pasteCode,
      };
      this.uploading = true;
      const { data, error } = await uploadTextBasedPaste(paste);
      this.pasteCode = "";
      this.uploading = false;
      if (error) {
        alert(error.message);
        return;
      }
    },
    emitCode(){
      const paste = {
        id: Math.random() * 1000,
        paste_type: "code",
        text_content: this.pasteCode,
        live_paste: true,
      };
      this.uploading = true;
      window.socket.emit("new-paste", paste)
      this.pasteCode = "";
      this.uploading = false;

    }
  },
  components: {
    Loader,
  },
};
</script>

<style lang="scss" scoped></style>
