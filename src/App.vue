<template>
  <div class="app bg-app-bg w-screen h-screen flex items-start justify-center">
    <auth-manager v-if="showAuthContainer" @getPastes="fetchPages" />
    <div
      :class="[
        showUploadContainer ? 'bg-[#00000033]' : 'bg-none h-0 w-0',
        'shade h-screen  sm:bg-none flex justify-center items-start sm:min-w-[300px] w-full z-30 fixed sm:relative sm:w-[25%] sm:p-0 p-5',
      ]"
      @click.self="showUploadContainer = false"
    >
      <UploadContainer
        :showContainer="showUploadContainer"
        @toggleContainer="showUploadContainer = !showUploadContainer"
      />
    </div>
    <div
      class="sm:w-[75%] w-full h-full px-0 sm:px-10 flex flex-col items-center"
    >
    <transition enter-active-class="animate__animated animate__faster animate__slideInDown">
      <paste-type-switcher
        v-if="pastes.length > 0"
        @showPastesOfType="(type) => (activePasteType = type)"
      />
    </transition>
      <div
        ref="pastesWrapper"
        class="pastesWrapper w-full gap-4 grid justify-center items-strwetch xl:grid-cols-3 sm:grid-cols-2 pt-5 pb-40 sm:pb-10 px-5 overflow-y-auto"
      >

      <!-- skeleton-loaders -->
        <div
          class="skeleton-loaders gap-4 sm:w-[65vw] w-[100vw] grid xl:grid-cols-3 sm:grid-cols-3 h-full"
          v-if="fetchingPastes"
        >
            <div
              v-for="i in 60"
              :key="i"
              class="skeleton-box w-full h-[100px] rounded-xl"
            ></div>
        </div>
      <!-- skeleton-loaders -->
      
      <!-- Uploaded Pastes -->
          <transition-group
            enter-active-class="animate__animated animate__fadeInDown"
          >
            <paste-card
              v-for="paste in filteredPastes"
              :key="paste.id"
              :paste="paste"
              @openPaste="setPasteToView(paste)"
              @pasteToEdit="setPasteToEdit(paste)"
              @pasteToDelete="setPasteToDelete(paste)"
            />
          </transition-group>
      <!-- Uploaded Pastes -->
      </div>
      <PasteUpdater
        v-if="pasteToEdit"
        :pasteToEdit="pasteToEdit"
        @closeUpdater="pasteToEdit = null"
      />
      <PasteDeleter
        v-if="pasteToDelete"
        :pasteToDelete="pasteToDelete"
        @closeDeleter="pasteToDelete = null"
      />
      <PasteViewer
        v-if="pasteToView"
        :paste="pasteToView"
        @closeViewer="pasteToView = null"
      />
      <div
        class="flex items-center gap-4 translate-y-[-170%] sm:translate-y-0 justify-center w-[96%] py-2 bg-app-bg shadow-2xl"
      >
        <button
          v-for="(page, index) in pages"
          :key="page.start"
          @click="
            currentPageIndex = index;
            getPastes();
          "
          :class="[
            currentPageIndex === index
              ? 'bg-active-color rounded-3xl'
              : 'rounded-xl bg-base-color',
            'px-4 py-1 text-sm sm:hover:bg-active-color',
          ]"
        >
          {{ index + 1 }}
        </button>
      </div>
    </div>
    <settings
      :showSettings="showSettings"
      v-on:closeSettings="showSettings = false"
      v-on:openSettings="showSettings = true"
      v-on:showAuthContainer="
        showAuthContainer = true;
        showSettings = false;
      "
    />
  </div>
</template>

<script>
import UploadContainer from "./components/UploadContainer.vue";
import PasteTypeSwitcher from "./components/PasteTypeSwitcher.vue";
import PasteCard from "./components/PasteCard.vue";
import Settings from "./components/Settings.vue";
import AuthManager from "./components/AuthManager.vue";
import PasteViewer from "./components/PasteViewer.vue";
import PasteUpdater from "./components/PasteUpdater.vue";
import PasteDeleter from "./components/PasteDeleter.vue";

import { supabase, getPaginatedPastes, getPages } from "./supabase/index.js";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export default {
  data() {
    return {
      showUploadContainer: false,
      showSettings: false,
      pastes: [],
      activePasteType: "all",
      fetchingPastes: false,
      showAuthContainer: true,
      passwordObj: null,
      pages: [],
      currentPageIndex: 0,
      pasteToView: null,
      pasteToEdit: null,
      pasteToDelete: null,
      socketConnected: false,
    };
  },
  computed: {
    filteredPastes() {
      if (this.activePasteType == "all") return this.pastes;
      return this.pastes.filter(
        (paste) => paste.paste_type == this.activePasteType
      );
    },
  },
  methods: {
    listenOnPastes() {
      supabase
        .from("pastes")
        .on("INSERT", async (payload) => {
          this.pastes.unshift(payload.new);
          this.$refs.pastesWrapper.scrollTop = 0;
        })
        .on("UPDATE", async (payload) => {
          console.log("Update detected");
          console.log(payload);
          const indexOfUpdatedPaste = this.pastes.findIndex(
            (paste) => paste.id === payload.new.id
          );
          if (indexOfUpdatedPaste === -1) return;
          this.pastes[indexOfUpdatedPaste].text_content =
            payload.new.text_content;
        })
        .on("DELETE", async (payload) => {
          console.log("Delete detected");
          console.log(payload);
          this.pastes = this.pastes.filter(
            (paste) => paste.id !== payload.old.id
          );
        })
        .subscribe();
    },
    async fetchPages(){
      this.pages = await getPages();
      this.getPastes()
    },
    async getPastes() {
      this.pastes = [];
      this.showAuthContainer = false;
      try {
        this.fetchingPastes = true;
        const { error, pastes } = await getPaginatedPastes(
          this.pages[this.currentPageIndex]
        );

        if (error) {
          alert(error.message);
        } else {
          this.pastes = pastes;
          this.listenOnPastes();
          console.log(pastes);
          this.$refs.pastesWrapper.scrollTo = 0;
        }
      } catch (e) {
        alert(e);
      }
      this.fetchingPastes = false;
    },
    setPasteToView(paste) {
      this.pasteToView = paste;
      console.log(this.pasteToView);
    },
    setPasteToEdit(paste) {
      this.pasteToEdit = paste;
    },
    setPasteToDelete(paste) {
      this.pasteToDelete = paste;
    },
  },
  components: {
    UploadContainer,
    PasteTypeSwitcher,
    PasteCard,
    Settings,
    AuthManager,
    PasteViewer,
    PasteUpdater,
    PasteDeleter,
  },
  async mounted() {
    const socket = io("ws://https://pastedeck.deno.dev")
    window.socket = socket;

    socket.on("connection-success",(msg)=>{
      console.log(msg)
      this.socketConnected = true
    })

    socket.on('new-client-connected', (data) => {
      console.log(data);
    });

    socket.on('client-disconneted', (data) => {
      console.log(data);
    });

    socket.on("new-paste",(paste)=>{
      console.log("New Paste")
      console.log(paste)
      this.pastes.unshift(paste)
    })
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
* {
  transition: 0.3s ease-in-out;
  color: var(--text-color);
}
img {
  max-width: initial !important;
}
.shade {
  transition: none;
}
:root {
  font-family: "Roboto", sans-serif;
  --base-hue: 0;
  --standout-hue: calc(var(--base-hue) + 65);
  --base-color: hsl(var(--base-hue) 100% 99%);
  --app-bg: hsl(var(--base-hue) 40% 92%);
  --primary-color: hsl(var(--base-hue) 40% 92%);
  --primary-light: hsl(var(--base-hue) 60% 88%);
  --active-color: hsl(var(--base-hue) 100% 93%);
  --btn-color: hsl(var(--base-hue) 56% 81%);
  --standout-bg: hsl(var(--standout-hue, 65) 100% 84%);
  --text-color: hsl(0deg 0% 0%);
  --shadow-color: hsl(0deg 0% 0% / 16%);
}
.app {
  .hljs {
    background: var(--base-color);
  }
}
.darkOn {
  .icon {
    filter: invert(1);
  }
  input {
    color: var(--text-color) !important;
    border-color: var(--text-color) !important;
  }
  label {
    color: var(--text-color) !important;
  }
  --standout-hue: calc(var(--base-hue) + 65);
  --base-color: hsl(var(--base-hue) 100% 3%);
  --app-bg: hsl(var(--base-hue) 40% 5%);
  --primary-color: hsl(var(--base-hue) 40% 10%);
  --primary-light: hsl(var(--base-hue) 60% 10%);
  --active-color: hsl(var(--base-hue) 100% 20%);
  --btn-color: hsl(var(--base-hue) 56% 30%);
  --standout-bg: hsl(var(--standout-hue, 65) 100% 40%);
  --text-color: hsl(0deg 0% 100%);
}
@media (min-width: 1024px) {
  ::-webkit-scrollbar {
    width: 6px;
    height: 5px;
    border-radius: 20px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--base-color);
    border-radius: 20px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--btn-color);
    border-radius: 20px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
.skeleton-box {
  position: relative;
  overflow: hidden;
  background-color: var(--base-color);

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      var(--active-color) 20%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
