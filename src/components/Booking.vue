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
          <a
            href="#"
            class="service-link"
            @click.prevent="selectService(service)"
          >
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
              <p class="service-price">From ${{ service.price.toFixed(2) }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Modal Overlay -->
    <transition
      name="modal-fade"
      @before-enter="beforeModalEnter"
      @enter="modalEnter"
      @leave="modalLeave"
    >
      <div v-show="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h3>{{ modalTitle }}</h3>

          <!-- Dynamic Content -->
          <div v-if="currentModal === 'options'">
            <label for="options">Choose an option:</label>
            <select v-model="selectedOption" id="options">
              <option
                v-for="option in selectedService.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div v-if="currentModal === 'cart'">
            <!-- Cart Table -->
            <table class="cart-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Option</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                  <td>{{ item.service.title }}</td>
                  <td>{{ item.option.label }}</td>
                  <td>
                    <button @click="editCartItem(index)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="removeFromCart(index)">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Modal Actions -->
          <div v-if="currentModal === 'cart'" class="add-another-service">
            <p>Do you want to add another service to this appointment?</p>
            <button @click="addAnotherService">
              <i class="bi bi-plus-lg"></i> Add Another Service
            </button>
          </div>
          <div class="modal-actions">
            <button @click="closeModal">Cancel</button>
            <button v-if="currentModal === 'options'" @click="handleAddToCart">
              {{ isEditing ? "Update Cart" : "Add to Cart" }}
            </button>
            <button v-if="currentModal === 'cart'" @click="scheduleAppointment">
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "BookingSection",
  data() {
    return {
      services: [
        {
          title: "Boarding",
          description:
            "Need a safe and loving place for your dog while you're away?",
          price: 75.0,
          image: "Boarding.jpg",
          options: [
            {
              value: "baseRate",
              label: "Base Rate / per night - $75",
              price: 75.0,
            },
            { value: "puppyRate", label: "Puppy Rate - $81", price: 81.0 },
            {
              value: "holidayRate",
              label: "Holiday Rate / per night - $90",
              price: 90.0,
            },
          ],
        },
        {
          title: "Doggy Day Care",
          description:
            "Looking for a safe and fun spot for your pup for the day or while you're away?",
          price: 25.0,
          image: "Day Care.jpg",
          options: [
            {
              value: "halfDay",
              label: "Half Day ( ≤ 5hours) - $25",
              price: 25.0,
            },
            {
              value: "puppyHalf",
              label: "Puppy Half ( ≤ 5hours) - $32",
              price: 32.0,
            },
            {
              value: "holidayHalf",
              label: "Holiday Half ( ≤ 5hours) - $40",
              price: 40.0,
            },
            {
              value: "fullDay",
              label: "Full Day ( ≥ 6hours) - $50",
              price: 50.0,
            },
            {
              value: "puppyFull",
              label: "Puppy Full ( ≥ 6hours) - $63",
              price: 63.0,
            },
            {
              value: "holidayFull",
              label: "Holiday Full ( ≥ 6hours) - $80",
              price: 80.0,
            },
          ],
        },
        {
          title: "Dog Walking",
          description:
            "Adventure Awaits – One Step at a Time, Ready for the Journey!",
          price: 30.0,
          image: "Dog Walking.jpg",
          options: [
            { value: "30min", label: "30-minute - $30", price: 30.0 },
            {
              value: "puppy30min",
              label: "Puppy 30-minute - $35",
              price: 35.0,
            },
            {
              value: "holiday30min",
              label: "Holiday 30-minute - $45",
              price: 45.0,
            },
            { value: "60min", label: "60-Minute - $50", price: 50.0 },
            {
              value: "puppy60min",
              label: "Puppy 60-minute - $60",
              price: 60.0,
            },
            {
              value: "holiday60min",
              label: "Holiday 60-minute - $85",
              price: 85.0,
            },
          ],
        },
        {
          title: "House Sitting",
          description:
            "Comfort, Care, and Companionship – Right at Home for Your Furry Family!",
          price: 100.0,
          image: "House sitting.jpg",
          options: [
            {
              value: "catRate",
              label: "Cat Rate / per night - $100",
              price: 100.0,
            },
            {
              value: "baseRate",
              label: "Base Rate / per night - $125",
              price: 125.0,
            },
            {
              value: "holidayRate",
              label: "Holiday Rate / per night - $150",
              price: 150.0,
            },
            {
              value: "puppyRate",
              label: "Puppy Rate / per night - $150",
              price: 150.0,
            },
          ],
        },
        {
          title: "Drop-in Home Visit",
          description: "Quick Visits, Big Love – Keeping Pets Happy at Home!",
          price: 50.0,
          image: "Drop in Visit.jpg",
          options: [
            { value: "catRate", label: "Cat Rate - $50", price: 50.0 },
            { value: "hourRate", label: "1-Hour Rate - $63", price: 63.0 },
            { value: "puppyRate", label: "Puppy Rate - $69", price: 69.0 },
            { value: "holidayRate", label: "Holiday Rate - $75", price: 75.0 },
            {
              value: "overHourRate",
              label: "> 1-Hour Rate - $101",
              price: 101.0,
            },
          ],
        },
      ],

      isModalVisible: false,
      modalTitle: "",
      currentModal: null, // Current modal ('options' or 'cart')
      selectedService: null,
      selectedOption: null,
      cart: [],
      isEditing: false, // Flag to check if we are editing an item in the cart
      editingCartIndex: null, // Index of the item being edited
    };
  },
  methods: {
    selectService(service) {
      this.selectedService = service;
      this.selectedOption = null;
      this.modalTitle = `Select your options for ${service.title}`;
      this.currentModal = "options";
      this.isModalVisible = true;
      this.isEditing = false; // Reset editing flag when selecting new service
    },

    closeModal() {
      this.isModalVisible = false;
      this.selectedOption = null;
      this.currentModal = null;
      this.modalTitle = "";
      this.isEditing = false;
      this.editingCartIndex = null; // Reset editing state
    },

    handleAddToCart() {
      const option = this.selectedService.options.find(
        (o) => o.value === this.selectedOption
      );
      if (this.isEditing && this.editingCartIndex !== null) {
        // If editing an existing cart item, update it
        this.cart[this.editingCartIndex] = {
          service: this.selectedService,
          option,
        };
        this.isEditing = false; // Reset editing state
      } else {
        // Otherwise, add new item to cart
        this.cart.push({
          service: this.selectedService,
          option,
        });
      }
      this.isModalVisible = false;
      this.currentModal = "cart";
      this.modalTitle = "Your Cart";
      this.isModalVisible = true;
    },

    editCartItem(index) {
      const item = this.cart[index];
      this.selectedService = item.service;
      this.selectedOption = item.option.value;
      this.modalTitle = `Edit your selection for ${item.service.title}`;
      this.editingCartIndex = index;
      this.isEditing = true; // Set editing flag to true
      this.currentModal = "options"; // Open the options modal for editing
      this.isModalVisible = true;
    },

    removeFromCart(index) {
      this.cart.splice(index, 1); // Remove item from cart
    },
    scheduleAppointment() {
      const orderDetails = this.cart.map((item) => ({
        service: item.service.title,
        option: item.option.label,
      }));

      // Логируем заказ в формате JSON до сохранения в cookies
      console.log("Scheduling appointment with the following details:");
      console.log(JSON.stringify(orderDetails, null, 2));

      // Сохраняем данные в cookies
      document.cookie = `orderDetails=${encodeURIComponent(
        JSON.stringify(orderDetails)
      )}; path=/; max-age=86400;`; // Сохраняем на 1 день

      // Логируем, что данные успешно сохранены в cookies
      console.log("Order details saved to cookies:");

      // Чтение и вывод данных, сохраненных в cookies
      const savedOrderDetails = Cookies.get("orderDetails");
      if (savedOrderDetails) {
        console.log(
          "Saved order details from cookies:",
          JSON.parse(decodeURIComponent(savedOrderDetails))
        );
      } else {
        console.log("No order details found in cookies.");
      }

      alert("Your appointment has been scheduled!");
      this.cart = []; // Очистка корзины
      this.isModalVisible = false; // Закрытие модального окна

      // Редирект на страницу бронирования с передачей состояния
      this.$router.push({ path: "/booking", state: { orderDetails } });
    },
    addAnotherService() {
      // Закрываем модальное окно
      this.isModalVisible = false;
      this.currentModal = null;
      this.modalTitle = "";
      this.selectedService = null; // Сбросить выбранную услугу
      this.selectedOption = null; // Сбросить выбранную опцию
    },

    beforeModalEnter(el) {
      el.style.opacity = 0;
    },
    modalEnter(el, done) {
      el.offsetHeight; // Trigger reflow
      el.style.transition = "opacity 0.3s ease";
      el.style.opacity = 1;
      done();
    },
    modalLeave(el, done) {
      el.style.transition = "opacity 0.3s ease";
      el.style.opacity = 0;
      done();
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
  background-color: #fffbf4;
  padding: 60px 20px;
  color: #7d5d3b;

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
  .service-link {
    text-decoration: none;
  }
  .service-item {
    padding: 25px;
    border-radius: 0;
    transition: transform 0.3s ease;
    background-color: #fff;
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
    border-radius: 0;
    max-width: 600px;
    width: 100%;
  }

  .cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #7d5d3b;
      color: white;
    }

    td {
      color: #7d5d3b;
    }

    button {
      background-color: #7d5d3b;
      color: white;
      padding: 5px 10px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #9e7549;
      }

      i {
        font-size: 16px;
      }
    }
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
    border-radius: 0;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #9e7549;
    }
  }

  /* Fade In Animation */
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .cart-fade-enter-active,
  .cart-fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .cart-fade-enter,
  .cart-fade-leave-to {
    opacity: 0;
  }
  .add-another-service {
    margin-top: 20px;

    p {
      font-size: 16px;
      color: #7d5d3b;
    }

    button {
      background-color: #7d5d3b;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 10px;

      &:hover {
        background-color: #9e7549;
      }

      i {
        font-size: 18px;
        margin-right: 8px;
      }
    }
  }
}
</style>
