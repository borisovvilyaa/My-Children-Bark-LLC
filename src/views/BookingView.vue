<template>
  <section class="booking-section" id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Book Your Pet's Stay</h2>
      </div>
      <div class="booking-container">
        <div class="form-column">
          <PetDetailsForm
            :petDetails="petDetails"
            :handleFormSubmit="handleFormSubmit"
          />
        </div>
        <div class="orders-column">
          <OrdersSection :orders="orders" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cookies from "js-cookie";
import PetDetailsForm from "./PetDetailsForm.vue";
import OrdersSection from "./OrdersSection.vue";

export default {
  name: "BookingPage",
  components: {
    PetDetailsForm,
    OrdersSection,
  },
  data() {
    return {
      petDetails: {
        name: "",
        birthday: "",
        breed: "",
        weight: "",
        sex: "",
        spayNeutered: "",
        microchipped: "",
        houseTrained: "",
        dogFriendly: "",
        catFriendly: "",
        kidsFriendly: "",
        feedingSchedule: "",
        aloneTime: "",
        vetInfo: "",
      },
      orders: [],
    };
  },
  created() {
    const orderDetailsCookie = Cookies.get("orderDetails");
    if (orderDetailsCookie) {
      this.orders = JSON.parse(orderDetailsCookie);
    }
  },
  methods: {
    handleFormSubmit() {
      console.log("Form submitted with pet details:", this.petDetails);
    },
  },
};
</script>

<style scoped>
.booking-section {
  background: linear-gradient(to bottom, #f1e6d3, #d9c9a5);
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.booking-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

.form-column,
.orders-column {
  flex: 1;
  min-width: 48%; /* Ensures that the columns don't shrink too much */
}

.section-header {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
}

.primary-btn {
  background-color: #4d3b2e;
  color: #fff;
}
.btn:hover {
  transform: scale(1.05);
}

.d-flex {
  display: flex;
  gap: 10px;
}

input[type="date"] {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: border-color 0.3s;
}

input[type="date"]:focus {
  border-color: #4d3b2e;
  outline: none;
}
</style>
