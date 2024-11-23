<template>
  <Main />
  <About />
  <Booking />

  <Contacts />
</template>

<script>
import { WOW } from "wowjs";
import "animate.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Main from "@/components/Main.vue";
import Contacts from "@/components/Contacts.vue";
import About from "@/components/About.vue";
import Booking from "@/components/Booking.vue";

export default {
  name: "HomeView",
  components: {
    Main,
    About,
    Booking,
    Contacts,
  },
  mounted() {
    new WOW().init();
  },
};
</script>
