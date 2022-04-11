<template>
  <div class="w-full px-3 pb-2" v-if="uploading">
    <progress-bar :current="uploadedCount" :total="selectedImages.length" />
  </div>
  <div
    class="paste-box image-paste p-3 gap-3 grid grid-cols-2 max-h-full overflow-y-auto overflow-x-hidden"
  >
    <button
      class="relative rounded-3xl bg-btn-color flex justify-center items-center w-full h-[120px] group lg:hover:saturate-150 lg:hover:rounded-xl"
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
        class="w-[20px] group-hover:rotate-180"
        src="../../assets/plus-icon.svg"
      />
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
  },
  watch: {
    beginImageUpload() {
      console.log("Uploading images");
      this.uploadImages();
    },
  },
  props: {
    beginImageUpload: Number,
  },
};
</script>

<style></style>
