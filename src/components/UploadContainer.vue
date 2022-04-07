<template>
  <div
    :class="[
      showContainer == true
        ? 'animate__animated animate__fadeInUp animate__faster'
        : 'hidden lg:flex',
      'upload-container',
    ]"
  >
    <div
      class="options-wrapper flex place-items-center lg:grid lg:grid-cols-2 lg:gap-5 gap-1"
    >
      <div class="paste-type group" @click="activePasteBox = 'text'">
        <img
          src="../assets/text-clip.svg"
          :class="[
            activePasteBox == 'text' ? 'saturate-200' : '',
            'group-hover:rotate-180',
            'w-full',
          ]"
        />
        <p class="paste-type-text">Text</p>
      </div>

      <div class="paste-type group" @click="activePasteBox = 'images'">
        <img
          src="../assets/images-clip.svg"
          :class="[
            activePasteBox == 'images' ? 'saturate-200' : '',
            'group-hover:scale-105',
            'w-full',
          ]"
        />
        <p class="paste-type-text">Images</p>
      </div>

      <div class="paste-type group" @click="activePasteBox = 'files'">
        <img
          src="../assets/files-clip.svg"
          :class="[
            activePasteBox == 'files' ? 'saturate-200' : '',
            'lg:group-hover:rotate-90 lg:group-hover:translate-x-2 lg:group-hover:translate-y-3',
            'w-full',
          ]"
        />
        <p class="paste-type-text translate-y-[1px]">Files</p>
      </div>

      <div class="paste-type group" @click="activePasteBox = 'code'">
        <img
          src="../assets/code-clip.svg"
          :class="[
            activePasteBox == 'code' ? 'saturate-200' : '',
            'group-hover:rotate-90',
            'w-full',
          ]"
        />
        <p class="paste-type-text">Code</p>
      </div>
    </div>

    <div
      class="paste-input-wrapper absolute w-[90%] min-h-[100px] relative p-5 mb-2 bg-[#f4e4e4] grow rounded-[20px]"
    >
      <div
        class="absolute flex flex-col items-center left-[-14px] w-[110%] h-full z-10"
      >
        <hr
          class="h-[8px] w-[40%] bg-primary-light border-none rounded-full mb-2"
        />
        <div v-if="activePasteBox == 'text'" class="paste-box text-paste">
          <textarea
            v-model="pasteText"
            placeholder="paste or write text..."
            class="w-full h-full outline-none p-2 font-light bg-primary-light rounded-2xl"
          ></textarea>
        </div>
        <div
          v-if="activePasteBox == 'files'"
          class="paste-box file-paste"
        ></div>
        <div v-if="activePasteBox == 'code'" class="paste-box code-paste">
          <textarea
            v-model="pasteCode"
            placeholder="paste or write code..."
            class="w-full h-full outline-none p-2 font-light bg-primary-light rounded-2xl"
          ></textarea>
        </div>
        <image-uploader
          :beginImageUpload="beginImageUpload"
          v-if="activePasteBox == 'images'"
        />
        <button
          class="z-5 rounded-xl hover:rounded-full bg-app-bg absolute top-8 right-6 p-3 drop-shadow"
          v-if="activePasteBox == 'code' || activePasteBox == 'text'"
          @click="pasteClipboard"
        >
          <img
            class="w-[20px]"
            src="../assets/paste-icon.png"
            alt="paste icon"
          />
        </button>
        <button
          @click="upload"
          class="bg-btn-color px-10 py-2 mb-5 mt-2 rounded-full font-medium lg:hover:saturate-150"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
  <button
    @click="$emit('toggleContainer')"
    :class="[
      showContainer ? 'hidden' : '',
      'lg:hidden center-x-abs bottom-[80px] rounded-full p-9 fixed bg-[#FFFBDA] z-20 drop-shadow-2xl',
    ]"
  >
    <img class="w-[20px]" src="../assets/plus-icon.svg" alt="plus icon" />
  </button>
</template>

<script>
import { uploadTextBasedPaste } from "../supabase/index.js";
import ImageUploader from "./uploaders/ImageUploader.vue";
export default {
  components: {
    ImageUploader,
  },
  data() {
    return {
      activePasteBox: "text",
      pasteText: "",
      pasteCode: "",
      beginImageUpload: false,
    };
  },
  methods: {
    async upload() {
      if (this.activePasteBox == "text") {
        const paste = {
          type: "text",
          textContent: this.pasteText,
        };
        const { data, error } = await uploadTextBasedPaste(paste);
        this.pasteText = "";
        if (error) {
          alert(error.message);
          return;
        }
      }
      if (this.activePasteBox == "code") {
        const paste = {
          type: "code",
          textContent: this.pasteCode,
        };
        const { data, error } = await uploadTextBasedPaste(paste);
        this.pasteCode = "";
        if (error) {
          alert(error.message);
          return;
        }
      }
      if (this.activePasteBox == "images") {
        this.beginImageUpload = true;
      }
    },
    pasteClipboard() {
      navigator.clipboard.readText().then(
        (clipText) => {
          if (this.activePasteBox == "text") {
            this.pasteText = clipText.trim();
          }
          if (this.activePasteBox == "code") {
            this.pasteCode = clipText;
          }
        },
        (err) => {
          alert(err);
        }
      );
    },
  },
  props: {
    showContainer: Boolean,
  },
  emits: ["toggleContainer"],
};
</script>

<style>
.paste-input-wrapper {
  box-shadow: 0px -2px 3px #00000029;
}
.paste-input-wrapper::before {
  content: "";
  position: absolute;
  background: #f2e1e1;
  width: 105%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px -2px 3px #00000029;
}
.paste-input-wrapper::after {
  content: "";
  position: absolute;
  background: #ffdada;
  width: 110%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  box-shadow: 0px -2px 3px #00000029;
  border-radius: 20px;
}
</style>
