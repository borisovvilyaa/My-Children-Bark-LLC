<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- Close button -->
      <button class="close-btn" @click="closeModal">
        <i class="bi bi-x-lg"></i>
      </button>
      <h3>Edit Order</h3>
      <form @submit.prevent="saveAndClose">
        <div class="form-group">
          <!-- Render the appropriate calendar based on the service type -->
          <component
            :is="getCalendarComponent(localOrder.service)"
            v-model="localOrder.selectedDate"
            @update:dates="updateSelectedDate"
          />
        </div>
        <button type="submit" class="primary-btn">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import CalendarRange from "@/components/Booking/CalendarRange.vue";
import CalendarMultiple from "@/components/Booking/CalendarMultiple.vue";
import CalendarWalk from "@/components/Booking/CalendarWalk.vue";

export default {
  props: {
    showModal: Boolean,
    currentOrder: Object,
  },
  components: {
    CalendarRange,
    CalendarMultiple,
    CalendarWalk,
  },
  data() {
    return {
      localOrder: { ...this.currentOrder },
    };
  },
  methods: {
    // Обновление выбранных дат
    updateSelectedDate({ dates, duration, formatted }) {
      this.localOrder.selectedDate = { dates, duration, formatted };
      console.log(
        "Selected Date Range in Modal:",
        this.localOrder.selectedDate
      );
    },

    // Закрытие модального окна
    closeModal() {
      this.$emit("close");
    },

    // Сохранение изменений и закрытие модального окна
    saveAndClose() {
      this.updateOrder();
      this.closeModal();
    },

    // Обновление заказа
    updateOrder() {
      this.$emit("update", this.localOrder);
    },

    // Получение компонента календаря в зависимости от типа услуги
    getCalendarComponent(serviceType) {
      switch (serviceType) {
        case "Boarding":
        case "House Sitting":
          return "CalendarRange";
        case "Doggy Day Care":
          return "CalendarMultiple";
        case "Dog Walking":
        case "Drop-in Home Visit":
          return "CalendarWalk";
        default:
          return "CalendarWalk";
      }
    },
  },
  watch: {
    // Обновление локального заказа при изменении переданного заказа
    currentOrder: {
      handler(newOrder) {
        this.localOrder = { ...newOrder };
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.064);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1100px;
  position: relative;
  animation: slideUp 0.3s;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4d3b2e;
  cursor: pointer;
}

.primary-btn {
  background-color: #4d3b2e;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
