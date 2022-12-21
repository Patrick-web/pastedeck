<template>
  <div class="w-full px-3 pb-2" v-if="uploading">
    <progress-bar :current="uploadedCount" :total="selectedImages.length" />
  </div>
  <div
    class="paste-box image-paste p-3 gap-3 grid grid-cols-2 max-h-full overflow-y-auto overflow-x-hidden"
  >
    <button
      class="relative rounded-3xl bg-btn-color flex justify-center items-center w-full h-[120px] group sm:hover:saturate-150 sm:hover:rounded-xl"
    >
      <input
        ref="imageInput"
        type="file"
        multiple
        accept="image/*"
        class="absolute inset-0 opacity-0 z-5 cursor-pointer"
        @change="showImagePreviews"
      />
      <img
        class="w-[20px] group-hover:rotate-180 icon"
        src="../../assets/plus-icon.svg"
      />
      <p
        class="absolute left-[50%] -translate-x-[50%] w-[80%] text-sm font-light px-4 py-2 rounded-full bg-primary-light -bottom-[20%]"
      >
        Max 5mb
      </p>
    </button>
    <transition-group leave-active-class="animate__animated animate__zoomOut">
      <div
        v-for="(preview, index) in imagePreviews"
        :key="index"
        @click="expandedImage = preview"
        class="group relative w-full h-[120px] overflow-hidden bg-primary-light rounded-2xl px-2 grid place-items-center"
      >
        <img
          :src="preview"
          class="w-full rounded-xl cursor-pointer group-hover:scale-105"
        />
        <button
          class="z-5 rounded-xl hover:rounded-full bg-red-300 absolute top-2 right-2 p-2 drop-shadow"
          @click.stop="removeImage(index)"
        >
          <img
            class="w-[15px]"
            src="../../assets/x-icon.svg"
            alt="paste icon"
          />
        </button>
      </div>
    </transition-group>
  </div>
  <div
    v-if="expandedImage"
    @click.self="expandedImage = null"
    class="fixed w-screen h-screen inset-0 z-40 flex justify-center items-center bg-[rgba(0,0,0,0.25)]"
  >
    <img class="w-[60%]" :src="expandedImage" />
  </div>
</template>

<script>
import ProgressBar from "../reusables/ProgressBar.vue";
import { uploadImagePaste } from "../../supabase/index.js";
import { formatBytes } from "../../utils/index.js";
export default {
  components: {
    ProgressBar,
  },
  data() {
    return {
      imagePreviews: [],
      selectedImages: [],
      expandedImage: null,
      uploadedCount: 0,
      uploading: false,
    };
  },
  methods: {
    showImagePreviews() {
      const files = this.$refs.imageInput.files;
      console.log(files[0]);
      if (!files[0]) return;
      this.selectedImages = Array.from(files);
      Array.from(files).forEach((file) => {
        this.imagePreviews.unshift(URL.createObjectURL(file));
      });
      this.imagePreviews = [...this.imagePreviews];
    },
    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      this.selectedImages.splice(index, 1);
    },
    async uploadImages() {
      this.uploading = true;
      for (const imagefile of this.selectedImages) {
        await uploadImagePaste(imagefile);
        this.imagePreviews.shift();
        this.uploadedCount += 1;
      }
      setTimeout(() => {
        this.uploading = false;
        this.selectedImages = [];
        this.uploadedCount = 0;
      }, 2000);
    },
    emitImages() {
      let emittedCount = 0;
      this.selectedImages.forEach((file) => {
        const blobURL = URL.createObjectURL(file);
        const paste = {        
          paste_type: "image",
          text_content: file.name,
          file_name: file.name,
          file_type: "image",
          file_url: blobURL,
          file_size: formatBytes(file.size),
          live_paste: true,
        }
        window.socket.emit("new-paste", paste)
        this.uploadedCount += 1;
        emittedCount += 1;
        if (emittedCount === this.selectedImages.length) {
          this.uploading = false;
          this.selectedImages = [];
          this.imagePreviews = []
          this.uploadedCount = 0;
        }
      });
    },
  },
};
</script>

<style></style>
