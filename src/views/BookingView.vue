<template>
  <section class="booking-section" id="booking">
    <div class="booking-content container">
      <div class="booking-main">
        <!-- Calendar on the left -->
        <div class="calendar">
          <div class="calendar-header">
            <div class="calendar-nav">
              <i class="bi bi-chevron-left" @click="changeMonth(-1)"></i>
              <h3>{{ monthName }} {{ year }}</h3>
              <i class="bi bi-chevron-right" @click="changeMonth(1)"></i>
            </div>
          </div>

          <table class="calendar-table">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in weeksInMonth" :key="index">
                <td
                  v-for="(day, i) in week"
                  :key="i"
                  @click="selectDate(day)"
                  :class="{
                    selected: selectedDate && selectedDate.getDate() === day,
                    disabled: isDateDisabled(day),
                    empty: day === null,
                  }"
                  :disabled="isDateDisabled(day) || day === null"
                >
                  {{ day }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Time slots in the center -->
        <div class="time-selection">
          <h2>Available Slots</h2>
          <div v-if="selectedDate">
            <p>{{ selectedDateText }}</p>
            <div class="time-slots">
              <button
                v-for="(time, index) in availableTimes"
                :key="index"
                class="time-slot-btn"
                :class="{
                  'selected-time': selectedTime === time,
                  'unselected-time':
                    selectedTime !== time && selectedTime !== null,
                }"
                @click="selectTime(time)"
              >
                {{ time }}
              </button>
            </div>
          </div>
        </div>

        <!-- Booking details on the right -->
        <div class="booking-details">
          <h3>Booking Details</h3>
          <div v-for="(order, index) in orders" :key="index" class="order-item">
            <div class="order-header">
              <strong class="service-name">{{ order.service }}</strong>
            </div>
            <div class="order-body">
              <p><span class="label">Option:</span> {{ order.option }}</p>
              <p>
                <span class="label">Duration:</span> {{ order.duration }} hours
              </p>
            </div>
          </div>

          <!-- Client Details Form -->
          <div class="client-details">
            <h3>Tell us a bit about yourself</h3>
            <form @submit.prevent="handleFormSubmit">
              <label for="name">Name *</label>
              <input
                type="text"
                id="name"
                v-model="clientDetails.name"
                required
                placeholder="Your name"
              />
              <label for="email">Email *</label>
              <input
                type="email"
                id="email"
                v-model="clientDetails.email"
                required
                placeholder="Your email"
              />
              <label for="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                v-model="clientDetails.phone"
                placeholder="Your phone number"
              />
              <label for="message">Add Your Message</label>
              <textarea
                id="message"
                v-model="clientDetails.message"
                placeholder="Your message"
              ></textarea>

              <button type="submit" class="btn next-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "BookingPage",
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      year: new Date().getFullYear(),
      currentDate: new Date(),
      orders: [],
      clientDetails: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      availableTimes: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"], // Временные слоты
    };
  },
  created() {
    const orderDetailsCookie = Cookies.get("orderDetails");

    if (orderDetailsCookie) {
      try {
        const orderDetails = JSON.parse(orderDetailsCookie);
        this.orders = orderDetails.map((order) => {
          const duration = this.getDuration(order.option);
          return {
            service: order.service || "Service not specified",
            option: order.option || "Option not specified",
            duration: duration || 1,
          };
        });

        if (orderDetails[0]?.selectedDate) {
          const dateParts = orderDetails[0].selectedDate.split("-");
          this.selectedDate = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2]
          );
        }
      } catch (error) {
        console.error("Error parsing cookies:", error);
      }
    }
  },
  computed: {
    monthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
        "default",
        { month: "long" }
      );
    },
    weeksInMonth() {
      const date = new Date(this.currentYear, this.currentMonth, 1);
      const daysInMonth = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      ).getDate();
      const weeks = [];
      let day = 1;
      const startDay = date.getDay();
      let week = Array(7).fill(null);

      for (let i = startDay; i < 7; i++) {
        if (day <= daysInMonth) {
          week[i] = day++;
        }
      }
      weeks.push(week);

      while (day <= daysInMonth) {
        week = Array(7).fill(null);
        for (let i = 0; i < 7; i++) {
          if (day <= daysInMonth) {
            week[i] = day++;
          }
        }
        weeks.push(week);
      }

      return weeks;
    },
    selectedDateText() {
      if (!this.selectedDate) return "Select a date";
      const options = { weekday: "long", month: "long", day: "numeric" };
      return this.selectedDate.toLocaleDateString("en-US", options);
    },
  },
  methods: {
    getDuration(option) {
      if (option.includes("Hour")) {
        const match = option.match(/(\d+)-Hour/);
        if (match) {
          return parseInt(match[1], 10);
        }
      }
      return 1; // Default duration is 1 hour
    },
    changeMonth(offset) {
      const newMonth = this.currentMonth + offset;
      if (newMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else if (newMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth = newMonth;
      }

      if (this.selectedDate) {
        const daysInNewMonth = new Date(
          this.currentYear,
          this.currentMonth + 1,
          0
        ).getDate();
        if (this.selectedDate.getMonth() !== this.currentMonth) {
          this.selectedDate = null;
        } else if (this.selectedDate.getDate() > daysInNewMonth) {
          this.selectedDate = new Date(
            this.currentYear,
            this.currentMonth,
            daysInNewMonth
          );
        }
      }
    },
    selectDate(date) {
      if (date && !this.isDateDisabled(date)) {
        this.selectedDate = new Date(this.currentYear, this.currentMonth, date);
      }
    },
    isDateDisabled(date) {
      if (date === null) return true;
      const selectedDate = new Date(this.currentYear, this.currentMonth, date);
      return selectedDate < this.currentDate;
    },
    selectTime(time) {
      this.selectedTime = this.selectedTime === time ? null : time; // Toggle selection
    },
  },
};
</script>
<style lang="scss" scoped>
.booking-section {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #fffbf4;
  padding: 150px;
  color: #bb8b5a;
  background-image: url("@/assets/Home/wave.svg");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
  overflow: hidden;

  .booking-content {
    display: flex;
    gap: 30px;
    max-width: 1200px;
    width: 100%;
  }

  .booking-main {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 30px;
  }

  .calendar {
    width: 30%;
    text-align: center;
    .calendar-header {
      margin-bottom: 10px;
      p {
        font-size: 16px;
        color: #9e7549;
        font-weight: 300;
      }
      h3 {
        font-size: 24px;
        font-weight: 400;
        color: #bb8b5a;
      }
      .calendar-nav {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 10px;
        i {
          font-size: 24px;
          cursor: pointer;
          color: #9e7549;
        }
      }
    }
    .calendar-table {
      width: 100%;
      margin-top: 10px;
      border-collapse: collapse;
      th,
      td {
        width: 14.28%;
        padding: 10px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }
      td.selected {
        background-color: #bb8b5a;
        color: white;
      }
      td.disabled {
        color: #d3d3d3;
        cursor: not-allowed;
      }
      td.empty {
        background-color: transparent;
        cursor: default;
      }
    }
  }

  .time-selection {
    width: 40%;
    text-align: center;
    h2 {
      font-size: 24px;
      color: #9e7549;
      margin-bottom: 20px;
      font-weight: 400;
    }
    .time-slots {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Creates 2 equal columns */
      gap: 10px; /* Adds space between buttons */
      margin-top: 10px;
      justify-content: center;

      button {
        background-color: transparent;
        color: #bb8b5a;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 0;
        transition: 0.3s;
      }
      .selected-time {
        background-color: #bb8b5a; /* Background color for selected time slot */
        color: white;
        border-color: #bb8b5a;
      }
      button:hover {
        background-color: #9e7549;
        color: #ffffff;
      }
    }
  }

  .booking-details {
    width: 30%;
    text-align: left;
    h3 {
      font-size: 22px;
      color: #bb8b5a;
    }
    .details-item {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 300;
    }
    .edit-details {
      font-size: 16px;
      color: #9e7549;
      text-decoration: underline;
      cursor: pointer;
    }
    .next-btn {
      background-color: #bb8b5a;
      color: white;
      padding: 12px 24px;
      border: none;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
      border-radius: 0;
      transition: 0.3s;
      margin-top: 20px;
    }
    .next-btn:hover {
      background-color: #9e7549;
    }
  }

  .client-details {
    margin-top: 20px;

    label {
      font-size: 16px;
      font-weight: 600;
      color: #9e7549;
      display: block;
      margin-bottom: 5px;
    }

    input,
    textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      font-size: 16px;
      background-color: #fffbf4;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    button {
      background-color: #bb8b5a;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 18px;
      cursor: pointer;
      border-radius: 0;
      transition: 0.3s;
    }
    button:hover {
      background-color: #9e7549;
    }
  }
}
</style>
