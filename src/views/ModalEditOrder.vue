<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- Close button -->
      <button class="close-btn" @click="closeModal">
        <i class="bi bi-x-lg"></i>
      </button>
      <h3>Edit Order</h3>
      <form @submit.prevent="updateOrder">
        <div class="form-group">
          <!-- Render the appropriate calendar based on the service type -->
          <component
            :is="getCalendarComponent(localOrder.service)"
            v-model="localOrder.selectedDate"
            @update:dates="updateSelectedDate"
            @save="saveAndClose"
          />
        </div>
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
    updateSelectedDate({ dates, duration }) {
      this.localOrder.selectedDate = { dates, duration };
    },
    closeModal() {
      this.$emit("close");
    },
    saveAndClose() {
      this.updateOrder(); // Сохраняем изменения
      this.closeModal(); // Закрываем модальное окно
    },
    updateOrder() {
      // Обновляем данные заказа и отправляем родителю
      this.$emit("update", this.localOrder);
    },

    updateLocalOrder(newOrder) {
      this.localOrder = { ...newOrder };
    },
    getCalendarComponent(serviceType) {
      switch (serviceType) {
        case "Boarding":
        case "House Sitting":
          return "CalendarRange";
        case "Doggy Day Care":
          return "CalendarMultiple";
        case "Dog Walking":
          return "CalendarWalk";
        case "Drop-in Home Visit":
          return "CalendarWalk";
        default:
          return "CalendarWalk";
      }
    },
  },
  watch: {
    currentOrder: "updateLocalOrder",
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
  position: relative; /* For positioning the close button */
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
  &:hover {
    background: none !important;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  cursor: not-allowed;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #4d3b2e;
  outline: none;
}

.primary-btn {
  background-color: #4d3b2e;
  color: #fff;
}

.d-flex {
  display: flex;
  gap: 10px;
}
</style>
