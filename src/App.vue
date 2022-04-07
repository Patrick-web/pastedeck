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
        ref="pastesWrapper"
        class="pastesWrapper w-full flex flex-col gap-4 grow pt-5 pb-40 px-5 overflow-y-auto"
      >
        <paste-card v-for="paste in pastes" :key="paste.id" :paste="paste" />
      </div>
    </div>
  </div>
</template>

<script>
import UploadContainer from "./components/UploadContainer.vue";
import PasteTypeSwitcher from "./components/PasteTypeSwitcher.vue";
import PasteCard from "./components/PasteCard.vue";
import { supabase, getAllPastes } from "./supabase/index.js";
export default {
  data() {
    return {
      showUploadContainer: false,
      pastes: [],
    };
  },
  methods: {
    listenOnPastes() {
      console.log("listening");
      supabase
        .from("pastes")
        .on("INSERT", async (payload) => {
          console.log("Added something");
          this.pastes.unshift(payload.new);
          this.$refs.pastesWrapper.scrollTo(0, 0);
          this.$refs.pastesWrapper.scrollTo(0, 0);
          console.log(this.$refs.pastesWrapper.scrollTop);
        })
        .subscribe();
    },
  },
  components: {
    UploadContainer,
    PasteTypeSwitcher,
    PasteCard,
  },
  async mounted() {
    try {
      const { error, pastes } = await getAllPastes();
      if (error) {
        alert(error.message);
      } else {
        this.pastes = pastes;
      }
    } catch (error) {
      alert(error);
    }
    this.listenOnPastes();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
* {
  transition: 0.3s ease-in-out;
}
img {
  max-width: initial !important;
}
.shade {
  transition: none;
}
#app {
  font-family: "Roboto", sans-serif;
  --base-color: #fffafa;
  --app-bg: #f2e1e1;
  --primary-color: #f2e1e1;
  --primary-light: #f3cfcf;
  --active-color: #ffdada;
  --btn-color: #eab4ce;
}
::-webkit-scrollbar {
  width: 4px;
  border-radius: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--active-color);
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--base-color);
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
