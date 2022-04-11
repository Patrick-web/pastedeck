import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/solarized-light.css";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("Refresh now");
  },
  onOfflineReady() {
    console.log("Offline ready");
  },
  strategies: "injectManifest",
});

createApp(App).use(VueHighlightJS).mount("#app");
