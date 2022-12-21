<template>
  <div
    ref="card"
    :class="[
      copied ? 'bg-green-300' : 'bg-base-color',
      paste.live_paste?'border-8 border-standout-bg rounded-3xl':'rounded-xl',
      'paste-card px-5 py-5 max-w-[90vw] relative flex flex-col justify-between',
    ]"
  >
  <div>
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


      <img
        v-if="paste.paste_type == 'image'"
        @click="$emit('openPaste')"
        class="cursor-pointer rounded-xl self-start w-full h-[150px] object-contain drop-shadow-md"
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

    <a :href="paste.live_paste?paste.file_url:blobURL" ref="dl" :download="paste.text_content"></a>
  </div>

    <div class="w-full mt-4 flex gap-4 items-center justify-center">
      <button
        v-if="paste.paste_type == 'text' || paste.paste_type == 'code' || paste.paste_type == 'image'"
        @click="$emit('openPaste')"
        class="bg-app-bg rounded-xl hover:rounded-[40px] hover:bg-active-color hover:scale-110 hover:shadow-xl p-3"
      >
        <img
          v-if="paste.paste_type==='text' && is_link(paste.text_content)"
          src="../assets/link-icon.svg"
          alt="link icon"
          class="w-[15px] icon"
        />
        <img
          v-else
          src="../assets/expand-icon.svg"
          alt="expand icon"
          class="w-[15px] icon"
        />
      </button>

      <button
        title="copy paste"
        @click="copyToClipboard"
        v-if="paste.paste_type == 'text' || paste.paste_type == 'code'"
        :class="[
          copied ? 'bg-green-200' : 'bg-app-bg',
          'rounded-xl hover:rounded-[40px] hover:bg-active-color hover:scale-110 hover:shadow-xl p-3',
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
        class="bg-app-bg rounded-xl hover:rounded-[40px] hover:bg-active-color hover:scale-110 hover:shadow-xl p-3"
      >
        <img
          class="w-[10px] icon"
          src="../assets/dowload-icon.svg"
          alt="download icon"
          v-if="!fetchingDowload"
        />
        <Loader v-else />
      </button>
      <button
        title="edit paste"
        @click="$emit('pasteToEdit')"
        v-if="!paste.live_paste && paste.paste_type == 'text' || paste.paste_type == 'code'"
        class='bg-app-bg rounded-xl hover:rounded-[40px] hover:bg-active-color hover:scale-110 hover:shadow-xl p-3'
      >
        <img
          class="w-[13px] icon"
          src="../assets/edit-icon.svg"
          alt="edit icon"
        />
      </button>
      <button
        @click="$emit('pasteToDelete')"
        v-if="!paste.live_paste"
        class='bg-app-bg rounded-xl hover:rounded-[40px] hover:bg-active-color hover:scale-110 hover:shadow-xl p-3'
      >
        <img
          class="w-[13px] icon"
          src="../assets/delete-icon.svg"
          alt="delete icon"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase/index.js";
import { isLink } from "../utils/index.js"
import Loader from "./reusables/Loader.vue"
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
      const link = this.$refs.dl;
      if(this.paste.live_paste){
        link.click();
        return
      }
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
          this.urlPrviewer.html = `<iframe border=0 frameborder=0 height=25 class="w-[100%] sm:w-[500px] h-[800px]" src="https://twitframe.com/show?url=${text}"></iframe>`;
        }
        if (text.includes("youtu")) {
          let video_id = text.split("=")[1] || text.split("be/")[1];
          this.urlPrviewer.type = "YouTube";
          this.urlPrviewer.html = `<iframe id="player" type="text/html" class="w-[100%] h-[200px] sm:h-[600px] " src="https://www.youtube.com/embed/${video_id}?enablejsapi=1" frameborder="0"></iframe>`;
        }
      }
    },
    viewPaste(){
      if(isLink(this.paste.text_content)){
        window.open(this.paste.text_content, '_blank');
      }else{
        const position = {
          x: this.$refs.card.getBoundingClientRect().left, 
          y: this.$refs.card.getBoundingClientRect().top, 
        }
        this.$emit("openPaste", {paste:this.paste, position})
      } 
    },
    is_link(text){
      return isLink(text)
    }
  },
  emits:['pasteToEdit','pasteToDelete','openPaste'],
  mounted() {
    this.parseText(this.paste.text_content);
  },
};
</script>

<style></style>
