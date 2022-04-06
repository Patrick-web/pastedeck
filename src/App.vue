<template>
  <div id="app" class="bg-app-bg w-screen h-screen flex">
    <div
      :class="[
        showUploadContainer ? 'bg-[#00000033]' : 'bg-none h-0 w-0',
        'shade h-screen  lg:bg-none flex justify-center items-start lg:min-w-[300px] w-full z-30 fixed lg:relative lg:w-[35%] lg:p-0 p-5',
      ]"
      @click.self="showUploadContainer = false"
    >
      <UploadContainer
        :showContainer="showUploadContainer"
        v-on:toggleContainer="showUploadContainer = !showUploadContainer"
      />
    </div>
    <div class="w-full h-full px-0 lg:px-10 flex flex-col items-center">
      <paste-type-switcher />
      <div
        class="w-full flex flex-col gap-4 grow pt-5 pb-40 px-5 overflow-y-auto"
      >
        <paste-card :paste="pc" />
      </div>
    </div>
  </div>
</template>

<script>
import UploadContainer from "./components/UploadContainer.vue";
import PasteTypeSwitcher from "./components/PasteTypeSwitcher.vue";
import PasteCard from "./components/PasteCard.vue";
export default {
  data() {
    return {
      showUploadContainer: false,
      pc: {
        type: "text",
        content: "loredckdc  cjsdbc cd dhcbsdc dscb",
      },
    };
  },
  components: {
    UploadContainer,
    PasteTypeSwitcher,
    PasteCard,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
* {
  transition: 0.2s ease-in-out;
}
img {
  max-width: initial !important;
}
.shade {
  transition: none;
}
#app {
  font-family: "Roboto", sans-serif;
}
</style>
