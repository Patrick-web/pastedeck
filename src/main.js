import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/solarized-light.css";

createApp(App).use(VueHighlightJS).mount("#app");
