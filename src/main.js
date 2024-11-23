import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

import { WOW } from "wowjs";
import "wowjs/css/libs/animate.css";

const app = createApp(App);
app.use(router);

document.title = "My Children Bark LLC";

app.mount("#app");
new WOW().init();
