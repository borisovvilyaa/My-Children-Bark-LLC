<template>
  <div class="calendar-range">
    <div class="calendar-header">
      <p>What days?</p>
      <p>{{ formattedDateRange }}</p>
    </div>

    <div class="calendars">
      <div v-for="calendar in calendars" :key="calendar.month" class="calendar">
        <div class="calendar-nav">
          <h3>{{ calendar.monthName }} {{ calendar.year }}</h3>
        </div>
        <table class="calendar-table">
          <thead>
            <tr>
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in calendar.weeks" :key="index">
              <td
                v-for="(day, i) in week"
                :key="`calendar-${calendar.month}-${index}-${i}`"
                :class="{
                  selected: isSelected(day, calendar),
                  disabled: isDateDisabled(day, calendar),
                  empty: day === null,
                }"
                @click="
                  !isDateDisabled(day, calendar) && selectDate(day, calendar)
                "
              >
                {{ day }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="duration-buttons">
      <div
        class="duration-option"
        :class="{ active: selectedDuration === '60' }"
        @click="selectDuration('60')"
      >
        1 hour
      </div>
      <div
        class="duration-option"
        :class="{ active: selectedDuration === '30' }"
        @click="selectDuration('30')"
      >
        30 min
      </div>
    </div>

    <div class="calendar-actions d-flex gap-2 mt-5">
      <button @click="resetDates">Reset dates</button>
      <button class="save" @click="saveDates">Save dates</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarMultiple",
  data() {
    return {
      currentDate: new Date(),
      selectedDates: [],
      selectedDuration: "60", // Default duration
    };
  },
  computed: {
    calendars() {
      return [
        this.generateCalendar(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth()
        ),
        this.generateCalendar(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1
        ),
      ];
    },
    formattedDateRange() {
      if (this.selectedDates.length === 0) return "No dates selected";
      const dates = this.selectedDates
        .map((date) =>
          date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        )
        .join(", ");
      const duration = this.selectedDuration
        ? ` | Duration: ${this.selectedDuration} minutes`
        : "";
      return `${dates}${duration}`;
    },
  },
  methods: {
    generateCalendar(year, month) {
      const date = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startDay = date.getDay();
      const weeks = [];
      let week = Array(7).fill(null);
      let day = 1;

      for (let i = startDay; i < 7; i++) {
        if (day <= daysInMonth) week[i] = day++;
      }
      weeks.push(week);

      while (day <= daysInMonth) {
        week = Array(7).fill(null);
        for (let i = 0; i < 7; i++) {
          if (day <= daysInMonth) week[i] = day++;
        }
        weeks.push(week);
      }

      return {
        year,
        month,
        monthName: date.toLocaleString("default", { month: "long" }),
        weeks,
      };
    },
    isSelected(day, calendar) {
      if (!day) return false;
      const currentDate = new Date(calendar.year, calendar.month, day);
      return this.selectedDates.some(
        (date) => date.toDateString() === currentDate.toDateString()
      );
    },
    isDateDisabled(day, calendar) {
      if (!day) return true;
      const currentDate = new Date(calendar.year, calendar.month, day);
      return currentDate < this.currentDate;
    },
    selectDate(day, calendar) {
      const selectedDate = new Date(calendar.year, calendar.month, day);
      const index = this.selectedDates.findIndex(
        (date) => date.toDateString() === selectedDate.toDateString()
      );

      if (index === -1) {
        this.selectedDates.push(selectedDate);
      } else {
        this.selectedDates.splice(index, 1);
      }
    },
    selectDuration(duration) {
      this.selectedDuration = duration;
    },
    resetDates() {
      this.selectedDates = [];
      this.selectedDuration = "60"; // Reset duration to default
    },
    saveDates() {
      const dateRange = {
        dates: this.selectedDates.length > 0 ? this.selectedDates : [],
        duration: this.selectedDuration ? [this.selectedDuration] : [],
        formatted: this.formattedDateRange,
      };

      console.log("Saved date range:", dateRange);
      this.$emit("update:dates", dateRange); // Передача данных наверх
      this.$emit("save", dateRange); // Emit saved data
    },
  },
};
</script>

<style lang="scss">
.calendar-range {
  .calendars {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .calendar {
      flex: 1;
      min-width: 300px;
    }
  }

  .calendar-header {
    margin-bottom: 15px;

    p {
      font-size: 14px;
      color: #9e7549;
      font-weight: 400;
    }

    h3 {
      font-size: 22px;
      font-weight: 500;
      color: #bb8b5a;
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
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
    }

    th {
      background-color: #f3e9db;
      color: #bb8b5a;
      font-weight: 600;
    }

    td {
      color: #9e7549;

      &.selected {
        background-color: #bb8b5a;
        color: #fff;
      }

      &.disabled {
        color: #d3d3d3;
        cursor: not-allowed;
      }

      &.empty {
        background-color: transparent;
        cursor: default;
      }

      &:hover:not(.disabled):not(.selected) {
        background-color: #f3e9db;
      }
    }
  }

  .duration-buttons {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    .duration-option {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 18px;
      font-size: 16px;
      font-weight: 500;
      background-color: #fff;
      color: #bb8b5a;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s, transform 0.3s;

      &.active {
        background-color: #bb8b5a;
        color: #fff;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(187, 139, 90, 0.6);
      }
    }
  }

  .calendar-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    .calendar-actions {
      flex-direction: column;
    }
  }

  // Media Queries
  @media (max-width: 768px) {
    .calendars {
      flex-direction: column;
      gap: 10px;

      .calendar {
        min-width: 100%;
      }
    }

    .calendar-header p {
      font-size: 12px;
    }

    .calendar-header h3 {
      font-size: 18px;
    }

    .calendar-table th,
    .calendar-table td {
      font-size: 14px;
      padding: 8px;
    }

    .duration-buttons {
      flex-direction: column;
      gap: 10px;

      .duration-option {
        font-size: 14px;
        padding: 10px 15px;
      }
    }

    .calendar-actions button {
      font-size: 14px;
      padding: 8px 16px;
    }
  }

  @media (max-width: 480px) {
    .calendar-header p {
      font-size: 10px;
    }

    .calendar-header h3 {
      font-size: 16px;
    }

    .duration-buttons .duration-option {
      font-size: 12px;
      padding: 8px 12px;
    }

    .calendar-actions button {
      font-size: 12px;
      padding: 6px 12px;
    }
  }
}
</style>
