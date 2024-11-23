<template>
  <section class="contact-section" id="contact">
    <div class="container">
      <h2 class="section-title">
        <img
          src="@/assets/Home/Heart-Pawprint.svg"
          alt="Paw Print Icon"
          class="paw-icon"
        />&#32;Let’s Stay in Touch!
      </h2>
      <div class="contact-container">
        <div class="contact-column">
          <div class="contact-item">
            <div class="contact-info">
              <div class="contact-info-item">
                <i class="bi bi-telephone contact-icon"></i>
                <a href="tel:+15622135146" class="contact-link">562-213-5146</a>
              </div>
              <div class="contact-info-item">
                <i class="bi bi-envelope contact-icon"></i>
                <a
                  href="mailto:mychildrenbark2017@gmail.com"
                  class="contact-link"
                  >mychildrenbark2017@gmail.com</a
                >
              </div>
              <div class="contact-info-item">
                <i class="bi bi-geo-alt contact-icon"></i>
                <span class="contact-link"
                  >1852 Daisy Avenue, Long Beach, CA, USA</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="contact-column">
          <div class="contact-item">
            <div class="contact-info">
              <div class="contact-info-item">
                <i class="bi bi-instagram contact-icon"></i>
                <a
                  href="https://www.instagram.com/_mychildrenbark_/"
                  class="contact-link"
                  target="_blank"
                  >Instagram</a
                >
              </div>
              <div class="contact-info-item">
                <i class="bi bi-facebook contact-icon"></i>
                <a
                  href="https://www.facebook.com/mychildrenbark2017"
                  class="contact-link"
                  target="_blank"
                  >Facebook</a
                >
              </div>
              <div class="contact-info-item">
                <img
                  src="@/assets/Home/rover.jpeg"
                  alt="Rover"
                  class="contact-icon"
                  style="width: 24px; height: 24px"
                />
                <a
                  href="https://www.rover.com/sit/natalb48870"
                  class="contact-link"
                  target="_blank"
                  >Rover</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactSection",
};
</script>

<style lang="scss" scoped>
.contact-section {
  background-color: #fff8ec; /* Soft, warm background */
  padding: 60px 20px;
  color: #7d5d3b; /* Subtle, warm text color */

  .section-title {
    text-align: left;
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: 600;
    color: #7d5d3b;

    @media (min-width: 768px) {
      font-size: 32px;
    }
  }

  .contact-container {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .contact-column {
    width: 100%;
    margin-bottom: 30px;

    @media (min-width: 768px) {
      width: 100%;
      margin-bottom: 0;
    }
  }

  .contact-item {
    margin-bottom: 30px;
    padding: 25px;
    border-radius: 12px;

    @media (min-width: 768px) {
      padding: 30px;
      margin-bottom: 50px;
    }
  }

  .contact-info {
    margin-top: 20px;
  }

  .contact-info-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .contact-icon {
    font-size: 24px;
    margin-right: 15px;
    color: #7d5d3b;
  }

  .contact-link {
    color: #9e7549;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s ease;

    &:hover {
      color: #7d5d3b;
    }

    @media (min-width: 768px) {
      font-size: 18px;
    }
  }
}
</style>
