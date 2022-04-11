<template>
  <div
    :class="[
      copied ? 'bg-green-300' : 'bg-base-color',
      'paste-card rounded-xl p-5 relative flex',
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
      class="h-[200px] rounded-xl self-center"
      :src="paste.file_url"
    />
    <div v-if="paste.paste_type == 'file'">
      <div class="flex items-center gap-2">
        <img
          :src="fileicon(paste)"
          class="h-[40px] cursor-pointer group-hover:scale-105"
        />
        <div>
          <p class="break-all font-light">{{ paste.file_name }}</p>
          <p class="text-sm break-all font-light">{{ paste.file_size }}</p>
        </div>
      </div>
    </div>
    <button
      @click="copyToClipboard"
      v-if="paste.paste_type == 'text' || paste.paste_type == 'code'"
      :class="[
        copied ? 'bg-green-200' : 'bg-app-bg',
        'z-5 rounded-xl hover:rounded-full absolute lg:top-2 lg:bottom-auto bottom-2 right-2 p-3',
      ]"
    >
      <img class="w-[10px]" src="../assets/copy-icon.svg" alt="copy icon" />
    </button>
    <button
      @click="downloadFile"
      v-if="paste.paste_type == 'file' || paste.paste_type == 'image'"
      class="z-5 rounded-xl hover:rounded-full bg-app-bg absolute top-2 right-2 p-3"
    >
      <img
        class="w-[10px]"
        src="../assets/dowload-icon.svg"
        alt="download icon"
      />
    </button>
    <a :href="blobURL" ref="dl" :download="paste.text_content"></a>
  </div>
</template>

<script>
import { supabase } from "../supabase/index.js";
import zipicon from "../assets/zip-icon.png";
import pdficon from "../assets/pdf-icon.png";
import spreadsheeticon from "../assets/spreadsheet-icon.png";
import unknownfileicon from "../assets/unknownfile-icon.png";
import docfileicon from "../assets/doc-icon.png";
import audiofileicon from "../assets/audio-icon.png";
import videofileicon from "../assets/video-icon.png";
import imagefileicon from "../assets/imagefile-icon.png";
import apkfileicon from "../assets/apk-icon.png";
import textfileicon from "../assets/textfile-icon.png";
export default {
  data() {
    return {
      copied: false,
      blobURL: null,
      downloaded: false,
    };
  },
  props: {
    paste: Object,
  },
  methods: {
    fileicon(paste) {
      if (
        paste.file_name.includes(".xls") ||
        paste.file_name.includes(".xlsx")
      ) {
        return spreadsheeticon;
      }
      if (
        paste.file_name.includes(".doc") ||
        paste.file_name.includes(".docx")
      ) {
        return docfileicon;
      }
      if (paste.file_type.includes(".audio")) {
        return audiofileicon;
      }
      if (paste.file_type.includes(".video")) {
        return videofileicon;
      }
      if (paste.file_name.includes(".zip")) {
        return zipicon;
      }
      if (paste.file_name.includes(".pdf")) {
        return pdficon;
      }
      if (paste.file_type.includes("image")) {
        return imagefileicon;
      }
      if (paste.file_name.includes(".apk")) {
        return apkfileicon;
      }
      if (paste.file_type.includes("text")) {
        return textfileicon;
      }

      return unknownfileicon;
    },
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
    async downloadFile() {
      const { data, error } = await supabase.storage
        .from("paste-files-bucket")
        .download(`${this.paste.paste_type}/${this.paste.text_content}`);
      console.log(data);
      console.log(error);
      this.blobURL = window.URL.createObjectURL(data);
      this.$refs.dl.click();
      window.URL.revokeObjectURL(this.blobURL);
      console.log(this.$refs.dl);
    },
  },
};
</script>

<style></style>
