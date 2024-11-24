import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Booking from "@/views/BookingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/booking",
    name: "booking",
    component: Booking,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
