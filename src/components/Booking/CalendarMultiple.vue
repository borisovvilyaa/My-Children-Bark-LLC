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

    <div class="time-selector mt-2">
      <div class="time-selector-group">
        <label for="start-time">Start Time:</label>
        <select id="start-time" v-model="startTime">
          <option v-for="hour in availableHours" :key="hour" :value="hour">
            {{ hour }}
          </option>
        </select>
      </div>

      <div class="time-selector-group">
        <label for="end-time">End Time:</label>
        <select id="end-time" v-model="endTime">
          <option v-for="hour in filteredEndTimes" :key="hour" :value="hour">
            {{ hour }}
          </option>
        </select>
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
      startTime: null,
      endTime: null,
      availableHours: Array.from({ length: 15 }, (_, i) => `${9 + i}:00`), // 9:00 AM to 11:00 PM
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
      const timeRange =
        this.startTime && this.endTime
          ? ` | from ${this.startTime} to ${this.endTime}`
          : "";
      return `${dates}${timeRange}`;
    },
    filteredEndTimes() {
      if (!this.startTime) return this.availableHours;

      const startHour = parseInt(this.startTime.split(":")[0], 10);
      return this.availableHours.filter((hour) => {
        const hourValue = parseInt(hour.split(":")[0], 10);
        return hourValue >= startHour;
      });
    },
  },
  watch: {
    startTime(newStartTime) {
      // Automatically update endTime if it is earlier than new startTime
      if (
        this.endTime &&
        parseInt(this.endTime.split(":")[0]) <
          parseInt(newStartTime.split(":")[0])
      ) {
        this.endTime = null; // Reset endTime if it's earlier than startTime
      }
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
    resetDates() {
      this.selectedDates = [];
      this.startTime = null;
      this.endTime = null;
    },
    saveDates() {
      console.log("saveDates method triggered");
      // Формируем объект для сохранения
      const dateRange = {
        dates: this.selectedDates.length > 0 ? this.selectedDates : [],
        duration: [this.startTime, this.endTime], // Список продолжительности
        formatted: this.formattedDateRange, // Форматированный диапазон
      };

      console.log("Saved date range:", dateRange);
      this.$emit("save", dateRange); // Отправляем данные наверх

      this.$emit("update:dates", dateRange); // Передача данных наверх
    },
  },
};
</script>

<style lang="scss" scoped>
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

    .calendar-nav {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 10px;

      i {
        font-size: 22px;
        cursor: pointer;
        color: #9e7549;
        transition: color 0.3s;

        &:hover {
          color: #bb8b5a;
        }
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

      &.range {
        background-color: #bb8b5a;
        color: #fff;
      }

      &.range-start,
      &.range-end {
        background-color: #bb8b5a;
        color: #fff;
        font-weight: bold;
      }

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

  .time-selector {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .time-selector-group {
    display: flex;
    flex-direction: column; /* Располагаем элементы вертикально */
    gap: 5px; /* Отступ между label и select */
  }

  label {
    font-size: 14px;
    color: #bb8b5a;
    font-weight: 500;
  }

  select {
    width: 150px;
    padding: 8px 12px;
    font-size: 14px;
    border: 2px solid #bb8b5a;
    background-color: #f3e9db;
    color: #9e7549;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s, box-shadow 0.3s;
    outline: none;
  }

  select:hover {
    border-color: #bb8b5a;
  }

  select:focus {
    border-color: #9e7549;
    box-shadow: 0 0 5px rgba(158, 117, 73, 0.5);
  }

  .calendar-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* Адаптивность */
  @media (max-width: 768px) {
    .calendars {
      flex-direction: column;
      gap: 15px;
    }

    .calendar {
      min-width: 100%;
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
    }

    select {
      width: 100%;
    }

    .time-selector-group {
      align-items: flex-start;
    }
  }

  @media (max-width: 480px) {
    .calendar-header p {
      font-size: 10px;
    }

    .calendar-header h3 {
      font-size: 16px;
    }

    .calendar-table th,
    .calendar-table td {
      font-size: 12px;
    }

    .calendar-actions {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
}
</style>
