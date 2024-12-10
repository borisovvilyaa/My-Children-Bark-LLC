<template>
  <header class="header-section" id="header">
    <div class="container">
      <nav class="navbar">
        <!-- Logo -->
        <div class="logo" @click="goToHomePage">
          <img src="@/assets/logo.jpg" alt="Logo" class="header-logo" />
        </div>

        <!-- Menu -->
        <div class="hamburger-menu">
          <input
            id="menu__toggle"
            type="checkbox"
            v-model="isMenuOpen"
            class="menu__checkbox"
          />
          <label class="menu__btn" for="menu__toggle">
            <span class="menu-icon"></span>
          </label>

          <div class="menu__box" :class="{ 'menu__box--open': isMenuOpen }">
            <ul>
              <li>
                <a class="menu__item" href="/#services" @click="closeMenu"
                  >Service</a
                >
              </li>
              <li>
                <a class="menu__item" href="/#about" @click="closeMenu"
                  >About</a
                >
              </li>
              <li>
                <a class="menu__item" href="/#contact" @click="closeMenu"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="desktop-menu">
          <ul>
            <li><a class="menu__item" href="#services">Service</a></li>
            <li><a class="menu__item" href="#about">About</a></li>
            <li><a class="menu__item" href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  watch: {
    isMenuOpen(newValue) {
      document.body.style.overflow = newValue ? "hidden" : "";
    },
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false;
    },
    goToHomePage() {
      window.location.href = "/"; // Путь к главной странице
    },
  },
};
</script>

<style scoped lang="scss">
.header-section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(to right, #f9f9f9, #fffbf4);
  transition: background-color 0.3s ease-in-out;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #bb8b5a;
  height: 100%;
}

.logo {
  flex: 1;
  transition: transform 0.3s ease;
  cursor: pointer; /* Добавлен курсор для индикации кликабельности */
}

.header-logo {
  max-width: 100px;
  height: auto;
}

.desktop-menu {
  display: flex;
  gap: 20px;
}

.desktop-menu ul {
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu__item {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #bb8b5a;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s ease;
}

.menu__item:hover {
  color: #7d5d3b;
  transform: translateY(-3px);
}

.hamburger-menu {
  display: none;
}

.menu__checkbox {
  display: none;
}

@media (max-width: 768px) {
  .header-section {
    background-color: #fffbf4;
    padding: 0 10px;
  }

  .header-logo {
    max-width: 120px;
  }

  .desktop-menu {
    display: none;
  }

  .hamburger-menu {
    display: block;
  }

  .menu__box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 80px 0;
    list-style: none;
    background-color: #222121;
    transition-duration: 0.3s;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    z-index: 5;
  }

  .menu__box--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    background-color: #fffbf4;
  }

  .menu__item {
    display: block;
    padding: 12px 24px;
    font-weight: 200;
    color: #bb8b5a;
    font-size: 24px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: background-color 0.3s, transform 0.3s ease;
  }

  .menu__item:hover {
    background-color: #bb8b5a;
    color: #fffbf4;
    transform: translateX(10px);
  }

  .menu__btn {
    position: relative;
    display: block;
    cursor: pointer;
    z-index: 10;
  }

  .menu-icon {
    width: 30px;
    height: 3px;
    background-color: #bb8b5a;
    position: relative;
    display: block;
    transition: transform 0.3s ease;
  }

  .menu-icon::before,
  .menu-icon::after {
    content: "";
    position: absolute;
    left: 0;
    width: 30px;
    height: 3px;
    background-color: #bb8b5a;
    transition: transform 0.3s ease;
  }

  .menu-icon::before {
    top: -8px;
  }

  .menu-icon::after {
    top: 8px;
  }

  input[type="checkbox"]:checked + .menu__btn .menu-icon {
    background-color: transparent;
  }

  input[type="checkbox"]:checked + .menu__btn .menu-icon::before {
    transform: rotate(45deg);
    top: 0;
  }

  input[type="checkbox"]:checked + .menu__btn .menu-icon::after {
    transform: rotate(-45deg);
    top: 0;
  }
}
</style>
