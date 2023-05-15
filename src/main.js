import "./assets/common.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import axios from "axios";

const app = createApp(App);
app.use(router).mount("#app");
app.config.globalProperties.$axios = axios; // 전역변수로 설정 컴포넌트에서 this.$axios 호출할 수 있음
app.config.globalProperties.$serverUrl = "//10.90.1.111:8081"; //api server
