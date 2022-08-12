<template>
  <div
    :class="[
      copied ? 'bg-green-300' : 'bg-base-color',
      'paste-card rounded-xl px-5 py-5 max-w-[90vw] relative flex flex-col',
    ]"
  >
    <p v-if="paste.paste_type == 'text'" class="font-light break-all">
      {{
        paste.text_content.length > 200
          ? paste.text_content.substring(0, 200) + "...."
          : paste.text_content
      }}
    </p>
    <pre
      v-highlightjs="sourcecode"
      v-if="paste.paste_type == 'code'"
      class="font-light w-full h-full"
    >
      <code class="w-full h-full text-sm -mb-10 -mt-5" @click="showFullPaste = true">{{ paste.text_content.length > 200
          ? paste.text_content.substring(0, 200) + "...."
          : paste.text_content }}</code>
      </pre>
    <div
      v-if="
        ((paste.paste_type == 'text' || paste.paste_type == 'code') &&
          paste.text_content.length > 200) ||
        urlPrviewer.type
      "
      class="flex items-center justify-center"
    >
      <button
        @click="showFullPaste = true"
        class="p-3 rounded-[40px] bg-btn-color border-none hover:rounded-xl"
      >
        <img
          src="../assets/expand-icon.svg"
          alt="expand icon"
          title="Show full paste"
          class="w-[15px] icon"
        />
      </button>
    </div>
    <button
      class="w-full flex justify-start items-center max-h-[200px] overflow-hidden"
    >
      <img
        @click="showFullPaste = !showFullPaste"
        v-if="paste.paste_type == 'image'"
        :class="[
          showFullPaste
            ? 'fixed z-50 center-abs max-w-[90%] h-auto m-auto max-h-[90%]'
            : '',
          ' rounded-xl self-start max-w-full max-h-[90%]',
        ]"
        :src="paste.file_url"
      />
    </button>
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
      title="copy paste"
      @click="copyToClipboard"
      v-if="paste.paste_type == 'text' || paste.paste_type == 'code'"
      :class="[
        copied ? 'bg-green-200' : 'bg-app-bg',
        'z-5 rounded-xl hover:rounded-[40px] absolute lg:top-2 lg:bottom-auto bottom-2 right-2 p-3',
      ]"
    >
      <img
        class="w-[10px] icon"
        src="../assets/copy-icon.svg"
        alt="copy icon"
      />
    </button>
    <button
      @click="downloadFile"
      v-if="paste.paste_type == 'file' || paste.paste_type == 'image'"
      class="z-5 rounded-xl hover:rounded-full bg-app-bg absolute top-2 right-2 p-3"
    >
      <img
        class="w-[10px] icon"
        src="../assets/dowload-icon.svg"
        alt="download icon"
        v-if="!fetchingDowload"
      />
      <svg
        v-else
        class="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </button>
    <a :href="blobURL" ref="dl" :download="paste.text_content"></a>

    <div
      v-if="showFullPaste"
      @click.self="showFullPaste = null"
      class="fixed w-screen h-screen backdrop-blur lg:py-5 inset-0 z-40 flex justify-center items-center bg-[rgba(0,0,0,0.25)]"
    >
      <div
        :class="[
          paste.paste_type == 'image' ? '' : 'animate__fadeInDown',
          'overflow-y-auto rounded-xl max-h-full w-[100%] lg:px-5  animate__animated animate__faster',
        ]"
      >
        <div v-if="urlPrviewer.type" class="h-[100vh] w-full bg-app-bg">
          <div v-html="urlPrviewer.html" class="w-[100%]"></div>
        </div>

        <p
          v-if="paste.paste_type == 'text' && paste.text_content.length > 200"
          class="font-light bg-app-bg p-5 rounded-xl"
        >
          {{ paste.text_content }}
        </p>
        <pre
          v-highlightjs="sourcecode"
          v-if="paste.paste_type == 'code'"
          class="font-light w-full h-full"
        >
      <code class="w-full h-full rounded-xl text-sm" >{{ 
           paste.text_content }}</code>
      </pre>
      </div>
      <button
        @click="showFullPaste = null"
        :class="[
          showFullPaste ? '' : 'hidden',
          'w-[50px] h-[80px] -bottom-10 left-[45%] rounded-full flex justify-center pt-3 fixed bg-red-500 z-[60] drop-shadow-2xl z-[80] animate__animated animate__fast animate__slideInUp',
        ]"
      >
        <img class="w-[20px] icon" src="../assets/x-icon.svg" />
      </button>
    </div>
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
      showFullPaste: false,
      fetchingDowload: false,
      urlPrviewer: {
        type: null,
        html: null,
      },
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
      this.fetchingDowload = true;
      if (!this.blobURL) {
        const filename = this.paste.file_url.replace(
          "https://nulsuzurtwplzkhfzxce.supabase.co/storage/v1/object/public/paste-files-bucket/files/",
          ""
        );
        const { data, error } = await supabase.storage
          .from("paste-files-bucket")
          .download(`${this.paste.paste_type}s/${filename}`);
        if (error) {
          this.fetchingDowload = false;
          return;
        }
        this.blobURL = window.URL.createObjectURL(data);
        const link = this.$refs.dl;
        setTimeout(() => {
          link.click();
        }, 1000);
        this.fetchingDowload = false;
      } else {
        const link = this.$refs.dl;
        link.click();
        this.fetchingDowload = false;
      }
    },
    parseText(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/;
      if (text.startsWith("http") && urlRegex.test(text)) {
        if (text.includes("https://twitter.com")) {
          this.urlPrviewer.type = "Twitter";
          this.urlPrviewer.html = `<iframe border=0 frameborder=0 height=25 class="w-[100%] lg:w-[500px] h-[800px]" src="https://twitframe.com/show?url=${text}"></iframe>`;
        }
        if (text.includes("youtu")) {
          let video_id = text.split("=")[1] || text.split("be/")[1];
          this.urlPrviewer.type = "YouTube";
          this.urlPrviewer.html = `<iframe id="player" type="text/html" class="w-[100%] h-[200px] lg:h-[600px] " src="https://www.youtube.com/embed/${video_id}?enablejsapi=1" frameborder="0"></iframe>`;
        }
      }
    },
  },
  mounted() {
    this.parseText(this.paste.text_content);
  },
};
</script>

<style></style>
