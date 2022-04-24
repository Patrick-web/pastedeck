import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueHighlightJS from "vue3-highlightjs";
import "vue3-highlightjs/styles/solarized-light.css";

import BaseInput from "@/components/reusables/BaseInput.vue";
import BaseButton from "@/components/reusables/BaseButton.vue";
// import { registerSW } from "virtual:pwa-register";

// const updateSW = registerSW({
//   onNeedRefresh() {
//     console.log("Refresh now");
//   },
//   onOfflineReady() {
//     console.log("Offline ready");
//   },
//   strategies: "injectManifest",
// });

const app = createApp(App);
app.component("BaseInput", BaseInput);
app.component("BaseButton", BaseButton);
app.use(VueHighlightJS);
app.mount("#app");
