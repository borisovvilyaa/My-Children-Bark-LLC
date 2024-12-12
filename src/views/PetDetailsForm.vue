<template>
  <div class="pet-details-page">
    <section class="pet-details-section">
      <div class="container">
        <form @submit.prevent="handleFormSubmit" class="pet-details-form">
          <!-- Personal Pet Details -->
          <div class="form-section">
            <!-- Pet Name -->
            <div class="form-group">
              <label for="petName">Pet Name *</label>
              <input
                type="text"
                id="petName"
                v-model="localPetDetails.name"
                :class="{ 'input-error': validationErrors.name }"
                placeholder="Your pet's name"
              />
              <span v-if="validationErrors.name" class="error-message">
                {{ validationErrors.name }}
              </span>
            </div>

            <!-- Birthday -->
            <div class="form-group">
              <label for="birthday">Birthday *</label>
              <input
                type="date"
                id="birthday"
                v-model="localPetDetails.birthday"
                :class="{ 'input-error': validationErrors.birthday }"
              />
              <span v-if="validationErrors.birthday" class="error-message">
                {{ validationErrors.birthday }}
              </span>
            </div>

            <!-- Breed -->
            <div class="form-group">
              <label for="breed">Breed *</label>
              <input
                type="text"
                id="breed"
                v-model="localPetDetails.breed"
                :class="{ 'input-error': validationErrors.breed }"
                placeholder="Pet's breed"
              />
              <span v-if="validationErrors.breed" class="error-message">
                {{ validationErrors.breed }}
              </span>
            </div>

            <!-- Weight -->
            <div class="form-group">
              <label for="weight">Weight (lbs) *</label>
              <input
                type="number"
                id="weight"
                v-model="localPetDetails.weight"
                :class="{ 'input-error': validationErrors.weight }"
                placeholder="Pet's weight"
                step="0.1"
              />
              <span v-if="validationErrors.weight" class="error-message">
                {{ validationErrors.weight }}
              </span>
            </div>

            <!-- Sex -->
            <div class="form-group">
              <label for="sex">Sex *</label>
              <select
                id="sex"
                v-model="localPetDetails.sex"
                :class="{ 'input-error': validationErrors.sex }"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span v-if="validationErrors.sex" class="error-message">
                {{ validationErrors.sex }}
              </span>
            </div>
          </div>

          <!-- Health and Social Details -->
          <div class="form-section">
            <h2 class="section-title">Health & Social Information</h2>

            <!-- Spay/Neutered -->
            <div class="form-group">
              <label>Spay or Neutered *</label>
              <div class="button-group">
                <button
                  type="button"
                  :class="{
                    active: localPetDetails.spayNeutered === 'Yes',
                    'button-error': validationErrors.spayNeutered,
                  }"
                  @click="localPetDetails.spayNeutered = 'Yes'"
                >
                  Yes
                </button>
                <button
                  type="button"
                  :class="{
                    active: localPetDetails.spayNeutered === 'No',
                    'button-error': validationErrors.spayNeutered,
                  }"
                  @click="localPetDetails.spayNeutered = 'No'"
                >
                  No
                </button>
              </div>
              <span v-if="validationErrors.spayNeutered" class="error-message">
                {{ validationErrors.spayNeutered }}
              </span>
            </div>

            <!-- Additional Binary Fields -->
            <div class="binary-fields-grid">
              <div
                v-for="(field, index) in binaryFields"
                :key="index"
                class="form-group"
              >
                <label>{{ field.label }} *</label>
                <div class="button-group">
                  <button
                    type="button"
                    :class="{
                      active: localPetDetails[field.name] === 'Yes',
                      'button-error': validationErrors[field.name],
                    }"
                    @click="localPetDetails[field.name] = 'Yes'"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    :class="{
                      active: localPetDetails[field.name] === 'No',
                      'button-error': validationErrors[field.name],
                    }"
                    @click="localPetDetails[field.name] = 'No'"
                  >
                    No
                  </button>
                </div>
                <span v-if="validationErrors[field.name]" class="error-message">
                  {{ validationErrors[field.name] }}
                </span>
              </div>
            </div>
          </div>

          <!-- Care Details -->
          <div class="form-section">
            <h2 class="section-title">Care Requirements</h2>

            <!-- Feeding Schedule -->
            <div class="form-group">
              <label for="feedingSchedule">Feeding Schedule *</label>
              <input
                type="text"
                id="feedingSchedule"
                v-model="localPetDetails.feedingSchedule"
                :class="{ 'input-error': validationErrors.feedingSchedule }"
                placeholder="e.g., 2 times daily, morning and evening"
              />
              <span
                v-if="validationErrors.feedingSchedule"
                class="error-message"
              >
                {{ validationErrors.feedingSchedule }}
              </span>
            </div>

            <!-- Alone Time -->
            <div class="form-group">
              <label for="aloneTime">Can be left alone for how long *</label>
              <input
                type="text"
                id="aloneTime"
                v-model="localPetDetails.aloneTime"
                :class="{ 'input-error': validationErrors.aloneTime }"
                placeholder="e.g., 4 hours"
              />
              <span v-if="validationErrors.aloneTime" class="error-message">
                {{ validationErrors.aloneTime }}
              </span>
            </div>

            <!-- Vet Info -->
            <div class="form-group">
              <label for="vetInfo">Vet Information (Optional)</label>
              <textarea
                id="vetInfo"
                v-model="localPetDetails.vetInfo"
                placeholder="Vet contact details or medical notes"
              ></textarea>
            </div>
          </div>

          <!-- Error Summary -->
          <!-- <div
            v-if="Object.keys(validationErrors).length"
            class="error-summary"
          >
            <p class="error-title">Please correct the following errors:</p>
            <ul class="error-list">
              <li
                v-for="(error, field) in validationErrors"
                :key="field"
                class="error-item"
              >
                {{ formatErrorMessage(field, error) }}
              </li>
            </ul>
          </div> -->

          <!-- Submit Button -->
          <button type="submit" class="btn submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? "Submitting..." : "Submit Pet Details" }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PetDetailsForm",
  props: {
    petDetails: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        birthday: "",
        breed: "",
        weight: null,
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
      }),
    },
  },
  data() {
    return {
      localPetDetails: { ...this.petDetails },
      validationErrors: {},
      isSubmitting: false,
      binaryFields: [
        { name: "microchipped", label: "Microchipped" },
        { name: "houseTrained", label: "House Trained" },
        { name: "dogFriendly", label: "Friendly with Dogs" },
        { name: "catFriendly", label: "Friendly with Cats" },
        { name: "kidsFriendly", label: "Friendly with Kids" },
      ],
    };
  },
  watch: {
    petDetails: {
      handler(newDetails) {
        this.localPetDetails = { ...newDetails };
        this.validationErrors = {};
      },
      deep: true,
    },
  },
  methods: {
    formatErrorMessage(field, error) {
      const fieldNames = {
        name: "Pet Name",
        birthday: "Birthday",
        breed: "Breed",
        weight: "Weight",
        sex: "Sex",
        spayNeutered: "Spay/Neutered Status",
        microchipped: "Microchip Status",
        houseTrained: "House Training",
        dogFriendly: "Dog Friendliness",
        catFriendly: "Cat Friendliness",
        kidsFriendly: "Kid Friendliness",
        feedingSchedule: "Feeding Schedule",
        aloneTime: "Alone Time",
      };
      return `${fieldNames[field] || field}: ${error}`;
    },
    validateForm() {
      const errors = {};

      // Name validation
      if (
        !this.localPetDetails.name ||
        this.localPetDetails.name.trim().length < 2
      ) {
        errors.name = "Must be at least 2 characters long";
      }

      // Birthday validation
      const today = new Date();
      const birthday = new Date(this.localPetDetails.birthday);
      if (!this.localPetDetails.birthday) {
        errors.birthday = "Birthday is required";
      } else if (birthday > today) {
        errors.birthday = "Cannot be in the future";
      }

      // Breed validation
      if (
        !this.localPetDetails.breed ||
        this.localPetDetails.breed.trim().length < 2
      ) {
        errors.breed = "Must be at least 2 characters long";
      }

      // Weight validation
      const weight = parseFloat(this.localPetDetails.weight);
      if (isNaN(weight) || weight <= 0 || weight > 300) {
        errors.weight = "Must be a positive number less than 300 lbs";
      }

      // Sex validation
      const validSexOptions = ["Male", "Female"];
      if (
        !this.localPetDetails.sex ||
        !validSexOptions.includes(this.localPetDetails.sex)
      ) {
        errors.sex = "Please select a valid option";
      }

      // Binary fields validation
      const requiredBinaryFields = [
        "spayNeutered",
        "microchipped",
        "houseTrained",
        "dogFriendly",
        "catFriendly",
        "kidsFriendly",
      ];

      requiredBinaryFields.forEach((field) => {
        if (
          !this.localPetDetails[field] ||
          !["Yes", "No"].includes(this.localPetDetails[field])
        ) {
          errors[field] = "Please select an option";
        }
      });

      // Feeding Schedule validation
      if (
        !this.localPetDetails.feedingSchedule ||
        this.localPetDetails.feedingSchedule.trim().length < 5
      ) {
        errors.feedingSchedule = "Provide more specific details";
      }

      // Alone Time validation
      const aloneTimeRegex = /^\d+\s*(hours?|hrs?)$/i;
      if (
        !this.localPetDetails.aloneTime ||
        !aloneTimeRegex.test(this.localPetDetails.aloneTime)
      ) {
        errors.aloneTime = "Specify in hours (e.g., '4 hours')";
      }

      return errors;
    },
    async handleFormSubmit() {
      // Reset previous errors
      this.validationErrors = {};

      // Validate form
      const errors = this.validateForm();

      // Check if there are any validation errors
      if (Object.keys(errors).length > 0) {
        this.validationErrors = errors;
        return;
      }

      // Prevent multiple submissions
      if (this.isSubmitting) return;

      // Mark as submitting
      this.isSubmitting = true;

      try {
        // Simulate API call or processing
        await this.submitPetDetails();

        // Emit updated pet details
        this.$emit("update:petDetails", this.localPetDetails);

        // Optional: Reset form or show success message
        this.resetForm();

        // Success notification
        this.showSuccessNotification();
      } catch (error) {
        // Error handling
        this.handleSubmissionError(error);
      } finally {
        // Reset submission state
        this.isSubmitting = false;
      }
    },
    async submitPetDetails() {
      // Simulate API call with delay
      return new Promise((resolve) => {
        setTimeout(() => {
          // Here you would typically make an actual API call
          console.log("Submitting pet details:", this.localPetDetails);
          resolve();
        }, 1500);
      });
    },
    resetForm() {
      // Reset to initial state or clear form
      this.localPetDetails = { ...this.petDetails };
    },
    showSuccessNotification() {
      // You could replace this with a more sophisticated notification system
      alert("Pet details submitted successfully!");
    },
    handleSubmissionError(error) {
      console.error("Submission error:", error);
      // You could implement more advanced error handling here
      alert("An error occurred. Please try again.");
    },
  },
};
</script>

<style scoped>
/* Continuing from previous styles */
.section-title {
  color: #7d5d3b;
  border-bottom: 2px solid #bb8b5a;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f5f0;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
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
  padding: 12px;
  border: 1px solid #d1b89e;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #bb8b5a;
  box-shadow: 0 0 0 3px rgba(187, 139, 90, 0.1);
}

.input-error {
  border-color: #ff5252;
}

.error-message {
  color: #ff5252;
  font-size: 0.85rem;
  position: absolute;
  bottom: -20px;
  left: 0;
}

.button-group {
  display: flex;
  gap: 15px;
}

.button-group button {
  flex: 1;
  padding: 12px;
  background-color: transparent;
  border: 2px solid #bb8b5a;
  color: #5f4b3a;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-group button.active {
  background-color: #bb8b5a;
  color: #ffffff;
}

.button-group button:hover {
  background-color: rgba(187, 139, 90, 0.1);
}

.button-group button.button-error {
  border-color: #ff5252;
}

.binary-fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.error-summary {
  background-color: #ffebee;
  border: 1px solid #ff5252;
  padding: 20px;
  margin-bottom: 20px;
}

.error-title {
  color: #d32f2f;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.error-list {
  list-style-type: none;
  padding: 0;
}

.error-item {
  color: #d32f2f;
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
}

.error-item::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #ff5252;
}

.submit-btn {
  background-color: #bb8b5a;
  color: #ffffff;
  padding: 15px;
  border: none;
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover {
  background-color: #9e7549;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Responsive Adjustments */
@media screen and (max-width: 600px) {
  .container {
    padding: 20px;
    margin: 0 10px;
  }

  .binary-fields-grid {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }

  .page-title {
    font-size: 2rem;
  }
}

/* Accessibility Enhancements */
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible {
  outline: 3px solid #bb8b5a;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .container {
    box-shadow: none;
  }

  .submit-btn {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .container {
    padding: 0px;
    margin: 0px;
  }
}
</style>
