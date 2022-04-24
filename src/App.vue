<template>
  <div class="app bg-app-bg w-screen h-screen flex items-start justify-center">
    <auth-manager v-if="showAuthContainer" @getPastes="getPastes" />
    <div
      :class="[
        showUploadContainer ? 'bg-[#00000033]' : 'bg-none h-0 w-0',
        'shade h-screen  lg:bg-none flex justify-center items-start lg:min-w-[300px] w-full z-30 fixed lg:relative lg:w-[25%] lg:p-0 p-5',
      ]"
      @click.self="showUploadContainer = false"
      v-if="passwordObj && passwordObj.access_level == 'ADMIN'"
    >
      <UploadContainer
        :showContainer="showUploadContainer"
        v-on:toggleContainer="showUploadContainer = !showUploadContainer"
      />
    </div>
    <div
      class="lg:w-[75%] w-full h-full px-0 lg:px-10 flex flex-col items-center"
    >
      <paste-type-switcher
        v-on:showPastesOfType="(type) => (activePasteType = type)"
      />
      <div
        ref="pastesWrapper"
        class="pastesWrapper w-full flex flex-col gap-4 grow pt-5 pb-40 lg:pb-10 px-5 overflow-y-auto"
      >
        <div class="skeleton-loaders" v-if="fetchingPastes">
          <div
            v-for="i in 5"
            :key="i"
            class="skeleton-box w-full h-[100px] my-5 rounded-xl"
          ></div>
        </div>
        <transition-group
          enter-active-class="animate__animated animate__fadeInDown"
        >
          <paste-card
            v-for="paste in filteredPastes"
            :key="paste.id"
            :paste="paste"
          />
        </transition-group>
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
import {
  supabase,
  getPastesByPassword,
  getAllPastes,
} from "./supabase/index.js";
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
        .on("INSERT", async () => {
          //  this.pastes.unshift(payload.new);
          //  this.$refs.pastesWrapper.scrollTo(0, 0);
          this.getPastes();
        })
        .subscribe();
    },
    async getPastes(payload = this.passwordObj) {
      this.passwordObj = payload || this.passwordObj;
      console.log(this.passwordObj);
      this.showAuthContainer = false;
      try {
        this.fetchingPastes = true;
        if (this.passwordObj.access_level == "ADMIN") {
          localStorage.setItem("AdminKey", this.passwordObj.share_password);
          const { error, pastes } = await getAllPastes();
          if (error) {
            alert(error.message);
          } else {
            this.pastes = pastes;
            console.log(pastes);
          }
        } else {
          const { error, pastes } = await getPastesByPassword(
            this.passwordObj.share_password
          );
          if (error) {
            alert(error.message);
          } else {
            this.pastes = pastes;
            console.log(pastes);
          }
        }
      } catch (e) {
        alert(e);
      }
      this.fetchingPastes = false;
    },
  },
  components: {
    UploadContainer,
    PasteTypeSwitcher,
    PasteCard,
    Settings,
    AuthManager,
  },
  async mounted() {
    this.listenOnPastes();
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
