<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- Close button -->
      <button class="close-btn" @click="closeModal">
        <i class="bi bi-x-lg"></i>
      </button>
      <h3>Edit Order</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <!-- Render the appropriate calendar based on the service type -->
          <component
            :is="calendarComponent"
            v-model="localOrder.selectedDate"
            @update:dates="updateSelectedDate"
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
  computed: {
    // Определяем компонент календаря на основе типа услуги
    calendarComponent() {
      const componentMap = {
        Boarding: "CalendarRange",
        "House Sitting": "CalendarRange",
        "Doggy Day Care": "CalendarMultiple",
        "Dog Walking": "CalendarWalk",
        "Drop-in Home Visit": "CalendarWalk",
      };
      return componentMap[this.localOrder.service] || "CalendarWalk";
    },
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
      document.body.classList.remove("no-scroll");
      this.$emit("close");
    },

    // Обработка отправки формы
    handleSubmit() {
      this.updateOrder();
      this.closeModal();
    },

    // Обновление заказа
    updateOrder() {
      this.$emit("update", this.localOrder);
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
    // Блокировка/разблокировка прокрутки при открытии/закрытии модального окна
    showModal: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          document.body.classList.add("no-scroll");
        } else {
          document.body.classList.remove("no-scroll");
        }
      },
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
  max-height: 90vh; /* Ограничиваем высоту модального окна */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1100px;
  position: relative;
  animation: slideUp 0.3s;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    padding: 10px;
  }
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

  @media (max-width: 480px) {
    font-size: 1.2rem;
    top: 5px;
    right: 5px;
  }
}

.primary-btn {
  background-color: #4d3b2e;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
}

h3 {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
}
.no-scroll {
  overflow: hidden;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }
}
</style>
