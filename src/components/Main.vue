<template>
  <!-- Main hero section -->
  <section class="hero-section" id="home">
    <!-- Container for hero content -->
    <div class="hero-content container">
      <!-- Text content of the hero section -->
      <div class="hero-text">
        <!-- Main title -->
        <h1 class="hero-title">My Children Bark LLC</h1>
        <!-- Subtitle -->
        <h2 class="hero-subtitle">
          Turning Happy Tails into Lifelong Memories!
        </h2>
        <!-- Description -->
        <p class="hero-description">
          At My Children Bark LLC, we go beyond care — we create joy. From
          personalized boarding and playful daycare to stress-free walks and
          attentive house sitting, we treat your pets like family. Because every
          fur baby deserves nothing but the best.
        </p>
        <!-- Service button -->
        <div class="hero-services">
          <a href="#services" class="service-link"> Explore Our Services </a>
        </div>
      </div>
      <!-- Logo -->
      <img
        src="@/assets/logo.jpg"
        alt="My Children Bark LLC Logo"
        class="hero-logo"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fffbf4;
  padding: 40px 20px;
  color: #bb8b5a;
  margin-top: 0px;
  /* Background Image for waves */
  background-image: url("@/assets/Home/wave.svg");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
  overflow: hidden;

  .hero-content {
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-logo {
    width: 500px;
    height: auto;
    max-width: 100%;
  }

  .hero-text {
    max-width: 600px;
    text-align: left;

    .hero-title {
      font-size: 48px;
      margin-bottom: 20px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .hero-subtitle {
      font-size: 28px;
      margin-bottom: 25px;
      font-weight: 500;
      color: #9e7549;
    }

    .hero-description {
      font-size: 18px;
      line-height: 1.8;
      margin-bottom: 30px;
      color: #7d5d3b;
    }
  }

  .hero-services {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: flex-start;
  }

  .service-link {
    color: #bb8b5a;
    font-size: 18px;
    text-decoration: none;
    padding: 12px 24px;
    border: 2px solid #bb8b5a;
    background-color: #fffbf4;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(187, 139, 90, 0.1);

    &:hover {
      background-color: #bb8b5a;
      color: #fffbf4;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(187, 139, 90, 0.2);
    }
  }

  /* For screens up to 1024px */
  @media (max-width: 1024px) {
    padding-top: calc(
      100px + 40px
    ); /* Adjust for header height + some padding */

    .hero-content {
      flex-direction: column-reverse;
      text-align: center;
    }

    .hero-logo {
      width: 250px;
    }

    .hero-title {
      font-size: 36px;
    }

    .hero-subtitle {
      font-size: 24px;
    }

    .hero-description {
      font-size: 16px;
    }

    .service-link {
      font-size: 16px;
    }

    .hero-services {
      justify-content: center;
    }
  }

  /* For screens up to 768px */
  @media (max-width: 768px) {
    padding-top: calc(
      50px + 50px
    ); /* Adjust for header height + more padding on smaller screens */

    .hero-logo {
      width: 200px;
    }

    .hero-title {
      font-size: 32px;
    }

    .hero-subtitle {
      font-size: 22px;
    }

    .hero-description {
      font-size: 14px;
    }

    .service-link {
      font-size: 14px;
      padding: 10px 20px;
    }

    .hero-services {
      justify-content: center;
    }
  }

  /* For screens up to 576px */
  @media (max-width: 576px) {
    padding: 150px 10px;
    hero-logo {
      width: 150px;
    }

    .hero-title {
      font-size: 28px;
    }

    .hero-subtitle {
      font-size: 20px;
    }

    .hero-description {
      font-size: 12px;
    }

    .service-link {
      font-size: 12px;
      padding: 8px 16px;
    }
  }
}
</style>
