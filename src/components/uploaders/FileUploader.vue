<template>
  <div class="w-full px-3 pb-2" v-if="uploading">
    <progress-bar :current="uploadedCount" :total="selectedFilesCopy.length" />
  </div>
  <div
    class="paste-box image-paste pr-5 gap-3 flex flex-col max-h-full overflow-y-auto overflow-x-hidden"
  >
    <button
      class="relative rounded-3xl bg-btn-color flex justify-center items-center w-full py-5 group lg:hover:saturate-150 lg:hover:rounded-xl"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        class="absolute inset-0 opacity-0 z-5 cursor-pointer"
        @change="addFiles"
      />
      <img
        class="w-[20px] group-hover:rotate-180"
        src="../../assets/plus-icon.svg"
      />
    </button>
    <transition-group
      leave-active-class="animate__animated animate__lightSpeedOutRight"
    >
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        @click="expandedImage = preview"
        class="group hover:bg-btn-color cursor-pointer relative py-2 w-full bg-primary-light rounded-2xl pl-1 pr-4 flex items-center gap-1"
      >
        <img
          :src="fileicon(file)"
          class="h-[50px] rounded-xl cursor-pointer group-hover:scale-105"
        />
        <p class="text-sm break-all">{{ file.name }}</p>
        <button
          class="z-5 rounded-xl hover:rounded-full bg-red-300 absolute center-y-abs -right-4 p-2 drop-shadow"
          @click.stop="removeFile(index)"
        >
          <img
            class="w-[15px]"
            src="../../assets/x-icon.svg"
            alt="remove icon"
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
import { uploadFilePaste } from "../../supabase/index.js";
import zipicon from "../../assets/zip-icon.png";
import pdficon from "../../assets/pdf-icon.png";
import spreadsheeticon from "../../assets/spreadsheet-icon.png";
import unknownfileicon from "../../assets/unknownfile-icon.png";
import docfileicon from "../../assets/doc-icon.png";
import audiofileicon from "../../assets/audio-icon.png";
import videofileicon from "../../assets/video-icon.png";
import imagefileicon from "../../assets/imagefile-icon.png";
import apkfileicon from "../../assets/apk-icon.png";
import textfileicon from "../../assets/textfile-icon.png";
export default {
  components: {
    ProgressBar,
  },
  data() {
    return {
      selectedFiles: [],
      selectedFilesCopy: [],
      expandedImage: null,
      uploadedCount: 0,
      uploading: false,
    };
  },
  computed: {},
  methods: {
    fileicon(file) {
      if (file.name.includes("xls") || file.name.includes("xlsx")) {
        return spreadsheeticon;
      }
      if (file.name.includes("doc") || file.name.includes("docx")) {
        return docfileicon;
      }
      if (file.type.includes("audio")) {
        return audiofileicon;
      }
      if (file.type.includes("video")) {
        return videofileicon;
      }
      if (file.type.includes("zip")) {
        return zipicon;
      }
      if (file.type.includes("pdf")) {
        return pdficon;
      }
      if (file.type.includes("image")) {
        return imagefileicon;
      }
      if (file.name.includes("apk")) {
        return apkfileicon;
      }
      if (file.type.includes("text")) {
        return textfileicon;
      }

      return unknownfileicon;
    },
    addFiles() {
      const files = this.$refs.fileInput.files;
      console.log(files);
      if (!files[0]) return;
      this.selectedFiles = [...Array.from(files), ...this.selectedFiles];
      this.selectedFilesCopy = [...this.selectedFiles];
    },
    showFilePreview() {
      console.log("previewing");
    },
    removeFile(index) {
      this.selectedFiles.splice(index, 1);
    },
    async uploadFile() {
      this.uploading = true;
      console.log(this.selectedFilesCopy.length);
      for (const file of this.selectedFilesCopy) {
        console.log("called");
        await uploadFilePaste(file);
        this.selectedFiles.shift();
        console.log("uploaded " + file.name);
        this.uploadedCount += 1;
      }
      console.log("Upload complete");
      setTimeout(() => {
        this.uploading = false;
        this.selectedFilesCopy = [];
        this.uploadedCount = 0;
      }, 2000);
    },
  },
  watch: {
    beginFileUpload() {
      console.log("Uploading Files");
      this.uploadFile();
    },
  },
  props: {
    beginFileUpload: Number,
  },
};
</script>

<style></style>
