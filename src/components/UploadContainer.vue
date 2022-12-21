<template>
  <div
    :class="[
      showContainer == true
        ? 'animate__animated animate__fadeInUp animate__faster'
        : 'hidden sm:flex',
      'upload-container max-w-[560px]',
    ]"
  >
    <div
      class="options-wrapper flex place-items-center sm:grid sm:grid-cols-2 sm:gap-5 gap-1"
    >
      <div class="paste-type group" @click="activePasteBox = 'text'">
        <svg
          class="group-hover:rotate-180 min-w-[70px] sm:min-w-[8vw]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="100"
            height="100"
            rx="30"
            :fill="
              activePasteBox == 'text'
                ? 'var(--active-color)'
                : 'var(--primary-color)'
            "
          />
        </svg>
        <p class="paste-type-text">Text</p>
      </div>

      <div class="paste-type group" @click="activePasteBox = 'images'">
        <svg
          class="group-hover:rotate-145 min-w-[70px] sm:min-w-[8vw]"
          viewBox="0 0 210 204"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M75.4538 12.2455C91.8204 -3.95448 118.18 -3.95449 134.546 12.2455L153.256 30.7647C156.286 33.7638 159.755 36.2841 163.543 38.239L186.938 50.3101C207.402 60.8696 215.548 85.9387 205.198 106.51L193.367 130.027C191.451 133.835 190.126 137.913 189.438 142.121L185.186 168.1C181.468 190.826 160.143 206.32 137.38 202.834L111.358 198.849C107.144 198.203 102.856 198.203 98.642 198.849L72.6203 202.834C49.8573 206.32 28.5323 190.826 24.8135 168.1L20.5625 142.121C19.874 137.913 18.549 133.835 16.633 130.027L4.80181 106.51C-5.54777 85.9387 2.59767 60.8696 23.0624 50.3101L46.4567 38.239C50.2454 36.2841 53.7143 33.7638 56.7442 30.7647L75.4538 12.2455Z"
            :fill="
              activePasteBox == 'images'
                ? 'var(--active-color)'
                : 'var(--primary-color)'
            "
          />
        </svg>

        <p class="paste-type-text">Images</p>
      </div>

      <div class="paste-type group" @click="activePasteBox = 'files'">
        <svg
          class="group-hover:rotate-208 group-hover:-translate-x-2 group-hover:translate-y-3 min-w-[70px] sm:min-w-[8vw]"
          viewBox="0 0 225 202"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M86.5192 15C98.0663 -5.00001 126.934 -4.99999 138.481 15L220.32 156.75C231.867 176.75 217.433 201.75 194.339 201.75H30.6606C7.56658 201.75 -6.86716 176.75 4.67985 156.75L86.5192 15Z"
            :fill="
              activePasteBox == 'files'
                ? 'var(--active-color)'
                : 'var(--primary-color)'
            "
          />
        </svg>

        <p
          class="paste-type-text translate-y-[1px] group-hover:-translate-y-[5px]"
        >
          Files
        </p>
      </div>

      <div class="paste-type group" @click="activePasteBox = 'code'">
        <svg
          viewBox="0 0 232 230"
          class="group-hover:rotate-90 min-w-[70px] sm:min-w-[8vw]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M96.9794 7.59433C108.039 -1.47295 123.961 -1.47295 135.021 7.59432L135.742 8.18593C142.031 13.3418 150.143 15.7239 158.221 14.7864L159.148 14.6788C173.354 13.0301 186.749 21.6383 191.15 35.2454L191.437 36.1332C193.94 43.8705 199.477 50.2603 206.78 53.8389L207.617 54.2495C220.46 60.5429 227.074 75.0262 223.42 88.8529L223.182 89.7551C221.104 97.6174 222.308 105.986 226.516 112.945L226.999 113.743C234.4 125.98 232.134 141.741 221.585 151.397L220.897 152.027C214.898 157.518 211.386 165.209 211.165 173.338L211.139 174.271C210.749 188.567 200.322 200.6 186.227 203.02L185.308 203.178C177.293 204.554 170.18 209.126 165.599 215.844L165.073 216.615C157.016 228.431 141.739 232.917 128.573 227.333L127.714 226.968C120.227 223.793 111.773 223.793 104.286 226.968L103.427 227.333C90.2609 232.917 74.9837 228.431 66.9268 216.615L66.4011 215.844C61.8197 209.126 54.707 204.554 46.6922 203.178L45.7725 203.02C31.6775 200.6 21.2507 188.567 20.8609 174.271L20.8355 173.338C20.6138 165.209 17.1015 157.518 11.1031 152.027L10.4148 151.397C-0.134086 141.741 -2.40006 125.98 5.001 113.743L5.4839 112.945C9.69235 105.986 10.8956 97.6174 8.81806 89.7551L8.57966 88.8529C4.92604 75.0262 11.5404 60.5429 24.3825 54.2495L25.2204 53.8389C32.5228 50.2603 38.0596 43.8706 40.5625 36.1332L40.8497 35.2454C45.2514 21.6383 58.646 13.0301 72.8519 14.6788L73.7788 14.7864C81.8567 15.7239 89.9691 13.3418 96.2579 8.18594L96.9794 7.59433Z"
            :fill="
              activePasteBox == 'code'
                ? 'var(--active-color)'
                : 'var(--primary-color)'
            "
          />
        </svg>

        <p class="paste-type-text">Code</p>
      </div>
    </div>

    <div
      class="paste-input-wrapper absolute w-[90%] min-h-[100px] relative p-5 mb-2 bg-primary-color grow rounded-[20px]"
    >
      <div
        class="absolute flex flex-col items-center left-[-14px] w-[110%] px-3 h-full z-10"
      >
        <hr
          class="h-[8px] w-[40%] hidden bg-primary-light border-none rounded-full mb-2"
        />
        <text-uploader
          v-if="activePasteBox == 'text'"
          ref="textUploader"
        />
        <code-uploader
          v-if="activePasteBox == 'code'"
          ref="codeUploader"
        />
        <file-uploader
          v-if="activePasteBox == 'files'"
          ref="fileUploader"
        />
        <image-uploader
          v-if="activePasteBox == 'images'"
          ref="imageUploader"
        />
        <div class="flex gap-2">
          <button
            @click="upload"
            class="bg-btn-color px-10 py-2 mb-5 mt-2 rounded-[40px] font-medium hover:rounded-xl sm:hover:saturate-150"
          >
            Upload
          </button>
          <button
            @click="emit"
            class="bg-btn-color px-10 py-2 mb-5 mt-2 rounded-[40px] font-medium hover:rounded-xl sm:hover:saturate-150"
          >Emit</button>
        </div>
      </div>
    </div>
  </div>
  <button
    @click="$emit('toggleContainer')"
    :class="[
      showContainer ? 'hidden' : '',
      'sm:hidden center-x-abs bottom-[120px] rounded-full p-9 fixed bg-standout-bg z-20 drop-shadow-2xl',
    ]"
  >
    <img class="w-[20px]" src="../assets/plus-icon.svg" alt="plus icon" />
  </button>
  <button
    @click="$emit('toggleContainer')"
    :class="[
      showContainer ? '' : 'hidden',
      'sm:hidden w-[80px] h-[50px] bottom-0 -right-10 center-y-abs rounded-full p-3 fixed bg-red-500 z-20 drop-shadow-2xl animate__animated animate__fast animate__slideInRight',
    ]"
  >
    <img class="w-[20px]" src="../assets/x-icon.svg" alt="close icon" />
  </button>
</template>

<script>
import ImageUploader from "./uploaders/ImageUploader.vue";
import FileUploader from "./uploaders/FileUploader.vue";
import TextUploader from "./uploaders/TextUploader.vue";
import CodeUploader from "./uploaders/CodeUploader.vue";
import Loader from "../components/reusables/Loader.vue";
export default {
  components: {
    ImageUploader,
    FileUploader,
    TextUploader,
    CodeUploader,
    Loader,
  },
  data() {
    return {
      activePasteBox: "text",
      pasteText: "",
      pasteCode: "",
      uploading: false,
    };
  },
  methods: {
     upload() {
      if (this.activePasteBox == "text") {
        this.$refs.textUploader.uploadText()
      }
      if (this.activePasteBox == "code") {
        this.$refs.codeUploader.uploadCode()
      }
      if (this.activePasteBox == "images") {
        this.$refs.imageUploader.uploadImages()
      }
      if (this.activePasteBox == "files") {
        this.$refs.fileUploader.uploadFiles()
      }
    },
    emit() {
      if (this.activePasteBox == "text") {
        this.$refs.textUploader.emitText()
      }
      if (this.activePasteBox == "code") {
        this.$refs.codeUploader.emitCode()
      }
      if (this.activePasteBox == "images") {
        this.$refs.imageUploader.emitImages()
      }
      if (this.activePasteBox == "files") {
        this.$refs.fileUploader.emitFiles()
      }
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
  box-shadow: 0px -2px 3px var(--shadow-color);
}
.paste-input-wrapper::before {
  content: "";
  position: absolute;
  background: var(--primary-color);
  width: 105%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px -2px 3px var(--shadow-color);
}
.paste-input-wrapper::after {
  content: "";
  position: absolute;
  background: var(--primary-color);
  width: 110%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  box-shadow: 0px -2px 3px #00000029;
  border-radius: 20px;
}
</style>
