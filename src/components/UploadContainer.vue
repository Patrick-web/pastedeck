<template>
  <div
    :class="[
      showContainer == true
        ? 'animate__animated animate__fadeInUp animate__faster'
        : 'hidden lg:flex',
      'upload-container flex flex-col justify-between items-center gap-5 py-7 px-5 bg-base-color xl:drop-shadow-xl w-full lg:h-screen h-[90%] rounded-3xl lg:rounded-none',
    ]"
  >
    <div class="options-wrapper place-items-center grid grid-cols-2 gap-5">
      <div class="paste-type" @click="activePasteBox = 'text'">
        <img
          src="../assets/text-clip.svg"
          :class="[activePasteBox == 'text' ? 'saturate-200' : '', 'w-full']"
        />
        <p class="paste-type-text">Text</p>
      </div>

      <div class="paste-type" @click="activePasteBox = 'images'">
        <img
          src="../assets/images-clip.svg"
          :class="[activePasteBox == 'images' ? 'saturate-200' : '', 'w-full']"
        />
        <p class="paste-type-text">Images</p>
      </div>

      <div class="paste-type" @click="activePasteBox = 'files'">
        <img
          src="../assets/files-clip.svg"
          :class="[activePasteBox == 'files' ? 'saturate-200' : '', 'w-full']"
        />
        <p class="paste-type-text translate-y-[1px]">Files</p>
      </div>

      <div class="paste-type" @click="activePasteBox = 'code'">
        <img
          src="../assets/code-clip.svg"
          :class="[activePasteBox == 'code' ? 'saturate-200' : '', 'w-full']"
        />
        <p class="paste-type-text">Code</p>
      </div>
    </div>

    <div
      class="paste-input-wrapper w-[90%] min-h-[100px] relative p-5 mb-2 bg-[#f4e4e4] grow rounded-[20px]"
    >
      <div
        class="absolute flex flex-col items-center left-[-14px] w-[110%] h-full z-10"
      >
        <hr
          class="h-[8px] w-[40%] bg-primary-light border-none rounded-full my-2"
        />
        <div v-if="activePasteBox == 'text'" class="paste-box text-paste">
          <textarea
            class="w-full h-full outline-none p-5 font-light bg-primary-light rounded-2xl"
          ></textarea>
        </div>
        <div
          v-if="activePasteBox == 'files'"
          class="paste-box file-paste"
        ></div>
        <div v-if="activePasteBox == 'code'" class="paste-box code-paste"></div>
        <div
          v-if="activePasteBox == 'images'"
          class="paste-box image-paste"
        ></div>
        <button class="bg-btn-color px-10 py-2 my-2 rounded-full font-medium">
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
export default {
  data() {
    return {
      activePasteBox: "text",
    };
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
  top: 10px;
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
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  box-shadow: 0px -2px 3px #00000029;
  border-radius: 20px;
}
</style>
