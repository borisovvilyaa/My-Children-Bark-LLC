<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading" class="preloader">
        <div class="loader"></div>
      </div>
    </transition>

    <Header v-if="!isLoading"></Header>
    <router-view v-if="!isLoading" />

    <Footer v-if="!isLoading"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<style>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fffbf4;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.paw-icon {
  width: 35px;
  height: 35px;
  margin-bottom: 15px;
}
/* Новый стиль для лоадера */
.loader {
  width: fit-content;
  font-weight: bold;
  white-space: pre;
  font-size: 30px;
  color: #000; /* Устанавливаем белый цвет для текста */
}

.loader:before {
  content: "Loading...";
  animation: l34 1s infinite alternate;
}

@keyframes l34 {
  0%,
  15%,
  75%,
  100% {
    content: "Loading...";
  }
  20% {
    content: "Loading...";
  }
  25% {
    content: "Lo ding...";
  }
  30% {
    content: "Load ng...";
  }
  35% {
    content: " oading...";
  }
  40% {
    content: "L ading...";
  }
  45% {
    content: "Loadin ...";
  }
  50% {
    content: "Loa ing...";
  }
  55% {
    content: "Loading  .";
  }
  60% {
    content: " oa ing...";
  }
  65% {
    content: "L ading...";
  }
  70% {
    content: "Load n ...";
  }
}

/* Анимация перехода */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
