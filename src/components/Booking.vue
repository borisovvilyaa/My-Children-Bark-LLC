<template>
  <section class="booking-section" id="services">
    <div class="container">
      <div class="section-header">
        <img
          src="@/assets/Home/Heart-Pawprint.svg"
          alt="Paw Print Icon"
          class="paw-icon"
        />
        <h2 class="section-title">Our Services</h2>
      </div>
      <div class="services-container">
        <div
          class="service-item"
          v-for="service in services"
          :key="service.title"
        >
          <a href="#" class="service-link" @click="selectService(service)">
            <div class="image-container">
              <img
                :src="require(`@/assets/Home/services/${service.image}`)"
                :alt="service.title"
                class="service-image"
              />
            </div>
            <div class="service-content">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <p class="service-price">From {{ service.price }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Service options modal -->
    <div
      v-if="isOptionsModalVisible"
      class="modal-overlay"
      @click="closeOptionsModal"
    >
      <div class="modal-content" @click.stop>
        <h3>Select your options for {{ selectedService.title }}</h3>

        <!-- Options dropdown -->
        <div>
          <label for="options">Choose an option:</label>
          <select v-model="selectedOption" id="options">
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Optional features dropdown based on option selected -->
        <div v-if="selectedOption">
          <label for="features">Choose additional features:</label>
          <select v-model="selectedFeature" id="features">
            <option
              v-for="feature in features[selectedOption]"
              :key="feature.value"
              :value="feature.value"
            >
              {{ feature.label }}
            </option>
          </select>
        </div>

        <div class="modal-actions">
          <button @click="addToCart">Add to Cart</button>
          <button @click="closeOptionsModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Cart Summary Modal -->
    <div
      v-if="isCartModalVisible"
      class="modal-overlay"
      @click="closeCartModal"
    >
      <div class="modal-content" @click.stop>
        <h3>Your Cart</h3>
        <ul>
          <li v-for="(item, index) in cart" :key="index">
            {{ item.service.title }} - {{ item.option.label }} -
            {{ item.feature.label }}
          </li>
        </ul>
        <div class="modal-actions">
          <button @click="scheduleAppointment">Schedule Appointment</button>
          <button @click="closeCartModal">Cancel</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "BookingSection",
  data() {
    return {
      services: [
        {
          title: "Boarding",
          description:
            "Need a safe and loving place for your dog while you're away?",
          price: "$75",
          image: "Boarding.jpg",
        },
        {
          title: "Doggy Day Care",
          description:
            "Looking for a safe and fun spot for your pup for the day or while you're away?",
          price: "$25",
          image: "Day Care.jpg",
        },
        {
          title: "Dog Walking",
          description:
            "Adventure Awaits – One Step at a Time, Ready for the Journey!",
          price: "$30",
          image: "Dog Walking.jpg",
        },
        {
          title: "House Sitting",
          description:
            "Comfort, Care, and Companionship – Right at Home for Your Furry Family!",
          price: "$100",
          image: "House sitting.jpg",
        },
        {
          title: "Drop-in Home Visit",
          description: "Quick Visits, Big Love – Keeping Pets Happy at Home!",
          price: "$50",
          image: "Drop in Visit.jpg",
        },
      ],
      isOptionsModalVisible: false,
      isCartModalVisible: false,
      selectedService: null,
      selectedOption: null,
      selectedFeature: null,
      cart: [],
      options: [
        { value: "puppyRate", label: "Puppy Rate - $69" },
        { value: "catRate", label: "Cat Rate - $50" },
        { value: "oneHourRate", label: "1-Hour Rate - $63" },
        { value: "holidayRate", label: "Holiday Rate - $75" },
      ],
      features: {
        puppyRate: [
          { value: "extraHour", label: "Extra Hour - $20" },
          { value: "grooming", label: "Pet Grooming - $40" },
        ],
        catRate: [
          { value: "extraHour", label: "Extra Hour - $20" },
          { value: "grooming", label: "Pet Grooming - $40" },
        ],
        oneHourRate: [
          { value: "extraHour", label: "Extra Hour - $20" },
          { value: "grooming", label: "Pet Grooming - $40" },
        ],
        holidayRate: [
          { value: "extraHour", label: "Extra Hour - $20" },
          { value: "grooming", label: "Pet Grooming - $40" },
        ],
      },
    };
  },
  methods: {
    selectService(service) {
      this.selectedService = service;
      this.selectedOption = null;
      this.selectedFeature = null;
      this.isOptionsModalVisible = true;
    },
    closeOptionsModal() {
      this.isOptionsModalVisible = false;
    },
    addToCart() {
      const option = this.options.find((o) => o.value === this.selectedOption);
      const feature = this.features[this.selectedOption].find(
        (f) => f.value === this.selectedFeature
      );

      this.cart.push({
        service: this.selectedService,
        option,
        feature,
      });

      this.isOptionsModalVisible = false;
      this.isCartModalVisible = true;
    },
    closeCartModal() {
      this.isCartModalVisible = false;
    },
    scheduleAppointment() {
      alert("Your appointment has been scheduled!");
      this.cart = [];
      this.isCartModalVisible = false;
    },
  },
};
</script>
<style lang="scss">
.booking-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fffbf4; /* Background color */
  padding: 60px 20px;
  color: #7d5d3b; /* Warm brown color */

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 50px;

    .section-title {
      font-size: 42px;
      color: #7d5d3b;
      font-weight: 600;
    }
  }

  .services-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    padding: 0 20px;
  }

  .service-item {
    padding: 25px;
    /* Убираем закругления */
    border-radius: 0;
    transition: transform 0.3s ease;
    box-sizing: border-box;
    background-color: #fff; /* White background for cards */
    border: 1px solid #7d5d3b;

    .image-container {
      width: 100%;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5e9d9;

      .service-image {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .service-content {
      padding: 20px;
      flex-grow: 1;
      overflow: hidden;

      .service-title {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 10px;
        color: #7d5d3b;
      }

      .service-description {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 10px;
        color: #7d5d3b;
      }

      .service-price {
        font-size: 16px;
        font-weight: 500;
        color: #7d5d3b;
      }
    }

    .service-link {
      display: block;
      text-decoration: none;
      color: inherit;
    }

    .button-container {
      display: flex;
      justify-content: center;
      padding: 20px;

      .service-link-button {
        display: inline-block;
        font-size: 14px;
        text-transform: uppercase;
        background-color: #7d5d3b;
        color: #fff;
        padding: 12px 20px;
        text-decoration: none;
        text-align: center;
        width: 100%;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #9e7549;
        }
      }
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    /* Убираем закругления */
    border-radius: 0;
    max-width: 500px;
    width: 100%;
    text-align: center;
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  select {
    padding: 10px;
    margin-top: 10px;
    width: 100%;
  }

  button {
    background-color: #7d5d3b;
    color: white;
    padding: 10px 20px;
    border: none;
    /* Убираем закругления */
    border-radius: 0;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #9e7549;
    }
  }
}
</style>
