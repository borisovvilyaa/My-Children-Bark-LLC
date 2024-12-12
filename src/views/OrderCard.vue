<template>
  <div class="order-card">
    <div class="order-details">
      <p><strong>Service:</strong> {{ localOrder.service }}</p>
      <p><strong>Option:</strong> {{ localOrder.option }}</p>
      <p>
        <strong>Date:</strong>
        {{ localOrder.date || "Please, set date and time" }}

        <button @click="showModal = true" class="">
          <i class="bi bi-pen"></i>
        </button>
      </p>
    </div>

    <!-- Modal for editing order -->
    <ModalEditOrder
      v-if="showModal"
      :showModal="showModal"
      :currentOrder="localOrder"
      @close="closeModal"
      @update="handleUpdate"
    />
  </div>
</template>

<script>
import ModalEditOrder from "./ModalEditOrder.vue";

export default {
  components: {
    ModalEditOrder,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      localOrder: { ...this.order },
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    handleUpdate(updatedOrder) {
      console.log("Updated Order:", updatedOrder);
      this.localOrder.date = updatedOrder.selectedDate.formatted;
    },
  },
  watch: {
    order: {
      handler(newOrder) {
        this.localOrder = { ...newOrder };
      },
      deep: true,
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
