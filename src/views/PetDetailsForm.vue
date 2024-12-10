<template>
  <section class="pet-details-section">
    <div class="container">
      <form @submit.prevent="handleFormSubmit" class="pet-details-form">
        <!-- Pet Name -->
        <div class="form-group">
          <label for="petName">Pet Name *</label>
          <input
            type="text"
            id="petName"
            v-model="localPetDetails.name"
            required
            placeholder="Your pet's name"
          />
        </div>

        <!-- Birthday -->
        <div class="form-group">
          <label for="birthday">Birthday *</label>
          <input
            type="date"
            id="birthday"
            v-model="localPetDetails.birthday"
            required
          />
        </div>

        <!-- Breed -->
        <div class="form-group">
          <label for="breed">Breed *</label>
          <input
            type="text"
            id="breed"
            v-model="localPetDetails.breed"
            required
            placeholder="Pet's breed"
          />
        </div>

        <!-- Weight -->
        <div class="form-group">
          <label for="weight">Weight (lbs) *</label>
          <input
            type="number"
            id="weight"
            v-model="localPetDetails.weight"
            required
            placeholder="Pet's weight"
          />
        </div>

        <!-- Sex -->
        <div class="form-group">
          <label for="sex">Sex *</label>
          <select id="sex" v-model="localPetDetails.sex" required>
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <!-- Spay/Neutered -->
        <div class="form-group">
          <label>Spay or Neutered *</label>
          <div class="button-group">
            <button
              type="button"
              :class="{ active: localPetDetails.spayNeutered === 'Yes' }"
              @click="localPetDetails.spayNeutered = 'Yes'"
            >
              Yes
            </button>
            <button
              type="button"
              :class="{ active: localPetDetails.spayNeutered === 'No' }"
              @click="localPetDetails.spayNeutered = 'No'"
            >
              No
            </button>
          </div>
        </div>

        <!-- Microchipped -->
        <div class="form-group">
          <label>Microchipped *</label>
          <div class="button-group">
            <button
              type="button"
              :class="{ active: localPetDetails.microchipped === 'Yes' }"
              @click="localPetDetails.microchipped = 'Yes'"
            >
              Yes
            </button>
            <button
              type="button"
              :class="{ active: localPetDetails.microchipped === 'No' }"
              @click="localPetDetails.microchipped = 'No'"
            >
              No
            </button>
          </div>
        </div>

        <!-- House Trained -->
        <div class="form-group">
          <label>House Trained *</label>
          <div class="button-group">
            <button
              type="button"
              :class="{ active: localPetDetails.houseTrained === 'Yes' }"
              @click="localPetDetails.houseTrained = 'Yes'"
            >
              Yes
            </button>
            <button
              type="button"
              :class="{ active: localPetDetails.houseTrained === 'No' }"
              @click="localPetDetails.houseTrained = 'No'"
            >
              No
            </button>
          </div>
        </div>

        <!-- Friendly with other dogs -->
        <div class="form-group">
          <label>Friendly with other dogs *</label>
          <div class="button-group">
            <button
              type="button"
              :class="{ active: localPetDetails.dogFriendly === 'Yes' }"
              @click="localPetDetails.dogFriendly = 'Yes'"
            >
              Yes
            </button>
            <button
              type="button"
              :class="{ active: localPetDetails.dogFriendly === 'No' }"
              @click="localPetDetails.dogFriendly = 'No'"
            >
              No
            </button>
          </div>
        </div>

        <!-- Friendly with cats -->
        <div class="form-group">
          <label>Friendly with cats *</label>
          <div class="button-group">
            <button
              type="button"
              :class="{ active: localPetDetails.catFriendly === 'Yes' }"
              @click="localPetDetails.catFriendly = 'Yes'"
            >
              Yes
            </button>
            <button
              type="button"
              :class="{ active: localPetDetails.catFriendly === 'No' }"
              @click="localPetDetails.catFriendly = 'No'"
            >
              No
            </button>
          </div>
        </div>

        <!-- Friendly with Kids -->
        <div class="form-group">
          <label>Friendly with Kids *</label>
          <div class="button-group">
            <button
              type="button"
              :class="{ active: localPetDetails.kidsFriendly === 'Yes' }"
              @click="localPetDetails.kidsFriendly = 'Yes'"
            >
              Yes
            </button>
            <button
              type="button"
              :class="{ active: localPetDetails.kidsFriendly === 'No' }"
              @click="localPetDetails.kidsFriendly = 'No'"
            >
              No
            </button>
          </div>
        </div>

        <!-- Feeding Schedule -->
        <div class="form-group">
          <label for="feedingSchedule">Feeding Schedule *</label>
          <input
            type="text"
            id="feedingSchedule"
            v-model="localPetDetails.feedingSchedule"
            required
            placeholder="Feeding schedule"
          />
        </div>

        <!-- Alone Time -->
        <div class="form-group">
          <label for="aloneTime">Can be left alone for how long *</label>
          <input
            type="text"
            id="aloneTime"
            v-model="localPetDetails.aloneTime"
            required
            placeholder="e.g., 4 hours"
          />
        </div>

        <!-- Vet Info -->
        <div class="form-group">
          <label for="vetInfo">Vet Information (if any)</label>
          <textarea
            id="vetInfo"
            v-model="localPetDetails.vetInfo"
            placeholder="Vet contact details or notes"
          ></textarea>
        </div>

        <button type="submit" class="btn submit-btn">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    petDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localPetDetails: { ...this.petDetails },
    };
  },
  watch: {
    petDetails: "updateLocalDetails",
  },
  methods: {
    updateLocalDetails(newDetails) {
      this.localPetDetails = { ...newDetails };
    },
    handleFormSubmit() {
      this.$emit("update:petDetails", this.localPetDetails);
      console.log("Pet Details submitted:", this.localPetDetails);
      alert("Form submitted successfully!");
    },
  },
};
</script>

<style scoped>
.pet-details-section {
  color: #7d5d3b;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.pet-details-form {
  padding: 60px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #5f4b3a;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1b89e;
  border-radius: 4px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 10px;
}

.button-group button {
  padding: 10px 15px;
  border: 1px solid #d1b89e;
  border-radius: 4px;
  background-color: #f8f1eb;
  cursor: pointer;
  font-weight: bold;
  color: #5f4b3a;
}

.button-group button.active {
  background-color: #bb8b5a;
  color: #fff;
  border-color: #bb8b5a;
}

.btn.submit-btn {
  background-color: #bb8b5a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn.submit-btn:hover {
  background-color: #9e7549;
}
</style>
