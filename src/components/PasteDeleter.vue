<template>
  <div @click.self="$emit('closeDeleter')" class="modal">
    <div
      class="flex flex-col items-center gap-2 rounded-3xl sm:px-5 bg-app-bg p-5 animate__animated animate__faster animate__zoomIn"
    >
      <p class="text-2xl font-bold">Delete this ?</p>
      <div
        class="paste-card bg-base-color rounded-xl px-5 py-5 max-w-[90vw] relative flex flex-col justify-between"
      >
        <div>
          <p
            v-if="pasteToDelete.paste_type == 'text'"
            class="font-light break-all"
          >
            {{
              pasteToDelete.text_content.length > 200
                ? pasteToDelete.text_content.substring(0, 200) + "...."
                : pasteToDelete.text_content
            }}
          </p>
          <pre
            v-highlightjs="sourcecode"
            v-if="pasteToDelete.paste_type == 'code'"
            class="font-light w-full h-full"
          >
            <code class="w-full h-full text-sm -mb-10 -mt-5" @click="showFullPaste = true">{{ pasteToDelete.text_content.length > 200
                ? pasteToDelete.text_content.substring(0, 200) + "...."
                : pasteToDelete.text_content }}</code>
            </pre>

          <div v-if="pasteToDelete.paste_type == 'file'">
            <div class="flex items-center gap-2">
              <img
                :src="fileicon(pasteToDelete)"
                class="h-[40px] cursor-pointer group-hover:scale-105"
              />
              <div>
                <p class="break-all font-light">
                  {{ pasteToDelete.file_name }}
                </p>
                <p class="text-sm break-all font-light">
                  {{ pasteToDelete.file_size }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 items-center justify-center mt-2">
        <button
          @click="deletePaste"
          class="bg-red-500 border-2 border-red-500 px-8 py-2 rounded-[40px] font-medium hover:rounded-xl sm:hover:saturate-150"
        >
          <loader v-if="loading" />
          <p v-else class="text-white">Delete</p>
        </button>
        <button
          @click="$emit('closeDeleter')"
          class="border-2 border-black text-black px-8 py-2 rounded-[40px] font-medium hover:rounded-xl sm:hover:saturate-150"
        >
          Abort
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { deletePaste } from "../supabase/index.js";

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

import Loader from "./reusables/Loader.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async deletePaste() {
      console.log("Deleting");
      this.loading = true;
      await deletePaste(this.pasteToDelete.id);
      this.loading = false;
      this.$emit("closeDeleter");
    },
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
      if (paste.file_type.includes("audio")) {
        return audiofileicon;
      }
      if (paste.file_type.includes("video")) {
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
  },
  props: {
    pasteToDelete: Object,
  },
  emits: ["closeDeleter"],
  components: {
    Loader,
  },
};
</script>

<style lang="scss" scoped></style>
