<template>
  <!-- Testimonials Section -->
  <section class="testimonials-section" id="about">
    <div class="container">
      <div class="section-header">
        <img
          src="@/assets/Home/Heart-Pawprint.svg"
          alt="Paw Print Icon"
          class="paw-icon"
        />
        <h2 class="section-title">What Our Clients Say</h2>
      </div>
      <div class="testimonials">
        <div class="testimonial">
          <p class="testimonial-text">
            "My dogs LOVE Natalie! Otherwise known as the dog Whisperer. They
            love 'vacationing' at her house. She is an excellent dog momma and
            there is no one I trust more with my babies."
          </p>
          <p class="testimonial-author">- Linda B., NV</p>
          <p class="testimonial-service">House Sitting - December 2023</p>
        </div>

        <div class="testimonial">
          <p class="testimonial-text">
            "Natalie is awesome!! She is really knowledgeable about dogs.
            Natalie takes the necessary attention your furry baby needs. She's
            my go-to for dog care when I'm on vacation."
          </p>
          <p class="testimonial-author">- Eisha A., CA</p>
          <p class="testimonial-service">Day Care - August 2024</p>
        </div>

        <div class="testimonial">
          <p class="testimonial-text">
            "I will NEVER use a doggy hotel ever again! Why when I have Natalie!
            She is an amazing sitter. She was very attentive, loving, and kind.
            I love her setup, and my Lady Ma'am felt right at home on the first
            night. Feeding instructions were followed to the letter. Regular
            walks and playtime. She also kept me updated regularly. She provides
            more services than a regular doggy daycare/hotel. Natalie's dogs are
            amazing as well. Gentle and playful. I will definitely use her
            services again. Well worth it!"
          </p>
          <p class="testimonial-author">- Krystal W., CA</p>
          <p class="testimonial-service">Boarding - October 2024</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsSection",
};
</script>

<style lang="scss" scoped>
.testimonials-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1e6d3;
  padding: 60px 20px;
  color: #bb8b5a;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 50px;

    .section-title {
      font-size: 42px;
      color: #bb8b5a;
      font-weight: 600;
    }
  }

  .testimonials {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    padding: 0 20px;
  }

  .testimonial {
    padding: 25px;
    border-radius: 12px; /* Rounded corners */
    transition: transform 0.3s ease;
    box-sizing: border-box;

    .testimonial-text {
      font-size: 16px;
      line-height: 1.6;
      color: #7d5d3b;
      margin-bottom: 20px;
      font-style: italic;
    }

    .testimonial-author {
      font-size: 15px;
      font-weight: 600;
      color: #bb8b5a;
      margin-bottom: 5px;
    }

    .testimonial-service {
      font-size: 14px;
      color: #9e7549;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 15px;

    .section-header .section-title {
      font-size: 32px;
    }

    .testimonials {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .testimonial {
      padding: 20px;
    }
  }

  @media (max-width: 576px) {
    .section-header .section-title {
      font-size: 28px;
    }

    .testimonial {
      .testimonial-text {
        font-size: 15px;
      }
    }
  }
}
</style>
