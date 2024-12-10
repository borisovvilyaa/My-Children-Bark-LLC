<template>
  <div class="booking-column booking-orders-section">
    <div v-if="localOrders.length > 0">
      <div
        v-for="(order, index) in localOrders"
        :key="index"
        class="order-card"
      >
        <div class="order-details">
          <p><strong>Service:</strong> {{ order.service }}</p>
          <p><strong>Option:</strong> {{ order.option }}</p>
          <p>
            <strong>Date:</strong>
            {{ formatDate(order.selectedDate) || "" }}
            <button @click="openOrderModal(order)" class="">
              <i class="bi bi-pen"></i>
            </button>
          </p>
        </div>

        <!-- Modal for editing order -->
        <ModalEditOrder
          v-if="showModal && currentOrder.id === order.id"
          :showModal="showModal"
          :currentOrder="currentOrder"
          @close="closeModal"
          @update="updateOrder"
        />
      </div>
    </div>
    <div v-else>
      <p>No orders found.</p>
    </div>
  </div>
</template>

<script>
import ModalEditOrder from "./ModalEditOrder.vue";

export default {
  components: {
    ModalEditOrder,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      currentOrder: null,
      localOrders: [], // Локальная копия данных
    };
  },
  watch: {
    // Следим за изменениями prop `orders` и обновляем локальную копию
    orders: {
      immediate: true,
      handler(newOrders) {
        this.localOrders = [...newOrders];
      },
    },
  },
  methods: {
    formatDate(selectedDate) {
      if (!selectedDate || !selectedDate.dates) return null;
      const dates = selectedDate.dates
        .map((date) =>
          new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        )
        .join(", ");
      return `Dates: ${dates} | Duration: ${selectedDate.duration} minutes`;
    },
    openOrderModal(order) {
      this.currentOrder = { ...order }; // Создайте копию для редактирования
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentOrder = null;
    },
    updateOrder(updatedOrder) {
      const index = this.localOrders.findIndex(
        (order) => order.id === updatedOrder.id
      );
      if (index !== -1) {
        // Обновляем заказ в списке
        this.localOrders.splice(index, 1, {
          ...this.localOrders[index],
          ...updatedOrder,
        });
      }
      this.$emit("update-orders", this.localOrders); // Уведомляем родителя об изменениях
      this.closeModal(); // Закрываем модальное окно
    },
  },
};
</script>

<style scoped>
.order-card {
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-details p {
  margin: 5px 0;
}
</style>
