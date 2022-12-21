<template>
  <div class="w-full px-3 pb-2" v-if="uploading">
    <progress-bar :current="uploadedCount" :total="selectedFilesCopy.length" />
  </div>
  <div
    class="paste-box image-paste pr-5 gap-3 flex flex-col max-h-full overflow-y-auto overflow-x-hidden"
  >
    <div class="sticky top-0 z-10 bg-primary-color rounded-full">
      <button
        class="relative rounded-3xl bg-btn-color flex justify-center items-center w-full py-5 mb-5 group sm:hover:saturate-150 sm:hover:rounded-xl"
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
        <p
          class="absolute left-[50%] -translate-x-[50%] w-[85%] pointer-events-none text-sm font-light px-4 py-2 rounded-full bg-primary-light -bottom-[30%]"
        >
          Max {{ formatBytes(MAXUPLOADSIZE) }}        </p>
      </button>
    </div>
    <div
      v-if="selectedFiles.length !== 0"
      class="bg-red-200 p-2 rounded-xl w-full flex"
    >
      <div
        v-if="exceededMaxUpload"
        class="h-full flex flex-col p-2 items-center justify-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 m-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <p v-if="exceededMaxUpload" class="text-sm">
          You have exceeded the upload limit of
          {{ formatBytes(MAXUPLOADSIZE) }}. Some file(s) will been
          <span
            class="text-sm w-[70px] font-bold text-red-900 bg-red-300 px-2 py-1 rounded-full"
          >
            skipped
          </span>
        </p>
        <p class="text-sm font-light">
          <span class="font-bold">
            {{ selectedFiles.length }}
          </span>
          files totaling to
          <span class="font-bold">
            {{ formatBytes(totalFileSize) }}
          </span>
        </p>
      </div>
    </div>
    <transition-group
      leave-active-class="animate__animated animate__lightSpeedOutRight"
    >
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        @click="expandedImage = preview"
        class="group relative py-2 w-full bg-primary-light rounded-2xl pl-1 pr-4 flex items-center gap-1"
      >
        <img :src="fileicon(file)" class="h-[40px]" />
        <div>
          <p class="text-sm break-all">{{ file.name }}</p>
          <p class="text-sm font-light break-all">
            {{ formatBytes(file.size) }}
          </p>
          <p
            v-if="file.skipped"
            class="text-sm w-[70px] font-bold text-red-900 bg-red-300 px-2 py-1 rounded-full"
          >
            Skipped
          </p>
        </div>
        <button
          class="z-5 rounded-xl hover:rounded-3xl bg-red-300 absolute center-y-abs -right-4 p-2 drop-shadow"
          @click.stop="removeFile(index)"
          title="Remove file"
          aria-label="remove file"
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
import { formatBytes } from "../../utils/index.js";

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
      MAXUPLOADSIZE: 1e8,
      exceededMaxUpload: false,
    };
  },
  computed: {
    totalFileSize() {
      return this.selectedFiles.reduce(
        (previous, file) => previous + file.size,
        0
      );
    },
  },
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
      if (!files[0]) return;
      this.selectedFiles = [...Array.from(files), ...this.selectedFiles];
      console.log(this.selectedFiles[0]);
      let index = this.selectedFiles.length - 1;
      let size = 0;
      while (index >= 0) {
        size += this.selectedFiles[index].size;
        console.log("Looping " + index);
        if (size > this.MAXUPLOADSIZE) {
          console.log("Exceeded");
          this.selectedFiles[index]["skipped"] = true;
          this.exceededMaxUpload = true;
        }
        index--;
      }
      this.selectedFilesCopy = [
        ...this.selectedFiles.filter((file) => !file.skipped),
      ];
    },
    showFilePreview() {
      console.log("previewing");
    },
    removeFile(index) {
      this.selectedFiles.splice(index, 1);
    },
    async uploadFiles() {
      this.uploading = true;
      console.log(this.selectedFilesCopy.length);
      for (const file of this.selectedFilesCopy) {
        console.log("called");
        await uploadFilePaste(file);
        this.selectedFiles.forEach((file, index) => {
          if (!file.skipped) {
            this.selectedFiles.splice(index, 1);
          }
        });
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
    emitFiles() {
      let emittedCount = 0;
      this.selectedFilesCopy.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const buffer = event.target.result;
          const paste = {        
            paste_type: "file",
            text_content: file.name,
            file_name: file.name,
            file_type: file.type,
            file_buffer: buffer,
            file_size: formatBytes(file.size),
            live_paste: true,
          }
          window.socket.emit("new-paste", paste)
          this.uploadedCount += 1;
          emittedCount += 1;
          if (emittedCount === this.selectedFilesCopy.length) {
            this.uploading = false;
            this.selectedFilesCopy = [];
            this.selectedFiles= [];
            this.uploadedCount = 0;
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },
};
</script>

<style></style>
