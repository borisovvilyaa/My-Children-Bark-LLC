<template>
  <footer id="footer" class="footer-section">
    <div class="container">
      <div class="footer-content">
        <div class="footer-item">
          <h5 class="footer-title">Let’s Stay Connected</h5>
          <p class="footer-description">
            At My Children Bark LLC, we’re here for all your dog care needs.
            Reach out to us today and let’s make your pet’s experience
            unforgettable!
          </p>
        </div>
        <div class="footer-item">
          <h5 class="footer-title">Quick Links</h5>
          <ul class="footer-links">
            <li><a href="#services" class="footer-link">Services</a></li>
            <li><a href="#about" class="footer-link">About</a></li>
            <li><a href="#contact" class="footer-link">Contact</a></li>
          </ul>
        </div>
        <div class="footer-item">
          <h5 class="footer-title">Contact Us</h5>
          <p class="footer-info">
            Phone:
            <a href="tel:+15622135146" class="footer-link">562-213-5146</a>
          </p>
          <p class="footer-info">
            Email:
            <a href="mailto:mychildrenbark2017@gmail.com" class="footer-link"
              >mychildrenbark2017@gmail.com</a
            >
          </p>
          <p class="footer-info">
            Location: 1852 Daisy Avenue, Long Beach, CA, USA
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>

<style scoped>
/* Make the footer always at the bottom of the page */
body,
html {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer-section {
  border-top: 1px solid #7d5d3b;
  background-color: #fff8ec; /* Soft warm background */
  padding: 60px 20px;
  color: #7d5d3b; /* Warm text color */
  flex-shrink: 0; /* Prevent footer from shrinking */
  width: 100%;
}

.footer-content {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-item {
  width: 100%;
  margin-bottom: 30px;
}

.footer-title {
  font-size: 20px;
  color: #7d5d3b;
  font-weight: 600;
  margin-bottom: 20px;
}

.footer-description {
  font-size: 16px;
  color: #7d5d3b;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  color: #7d5d3b;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #9e7549;
}

.footer-info {
  font-size: 16px;
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .footer-item {
    width: 30%;
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .footer-title {
    font-size: 18px;
  }

  .footer-link {
    font-size: 14px;
  }

  .footer-info {
    font-size: 14px;
  }
}
</style>
