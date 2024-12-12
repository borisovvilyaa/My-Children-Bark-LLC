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
                  range: isInRange(day, calendar),
                  'range-start': isStart(day, calendar),
                  'range-end': isEnd(day, calendar),
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
          <option v-for="hour in availableHours" :key="hour" :value="hour">
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
  name: "CalendarRange",
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      availableHours: Array.from({ length: 15 }, (_, i) => `${9 + i}:00`), // Generate hours from 9 AM to 11 PM
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
      if (!this.startDate) return "Select dates and times";
      const options = { day: "numeric", month: "short", year: "numeric" };
      const start = this.startDate.toLocaleDateString("en-US", options);
      const startTimeStr = this.startTime || "";
      const end = this.endDate
        ? `${this.endDate.toLocaleDateString("en-US", options)} ${
            this.endTime || ""
          }`
        : startTimeStr;
      return `${start} ${startTimeStr} – ${end}`;
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
      if (!day || !this.selectedDate) return false;
      const selectedDate = new Date(calendar.year, calendar.month, day);
      return (
        new Date(this.selectedDate).toDateString() ===
        selectedDate.toDateString()
      );
    },
    isInRange(day, calendar) {
      if (!day || !this.startDate || !this.endDate) return false;
      const currentDate = new Date(calendar.year, calendar.month, day);
      return currentDate >= this.startDate && currentDate <= this.endDate;
    },
    isStart(day, calendar) {
      if (!day || !this.startDate) return false;
      const currentDate = new Date(calendar.year, calendar.month, day);
      return currentDate.toDateString() === this.startDate.toDateString();
    },
    isEnd(day, calendar) {
      if (!day || !this.endDate) return false;
      const currentDate = new Date(calendar.year, calendar.month, day);
      return currentDate.toDateString() === this.endDate.toDateString();
    },
    isDateDisabled(day, calendar) {
      if (!day) return true;
      const currentDate = new Date(calendar.year, calendar.month, day);
      return currentDate < this.currentDate;
    },
    selectDate(day, calendar) {
      const selectedDate = new Date(calendar.year, calendar.month, day);
      if (!this.startDate || (this.startDate && this.endDate)) {
        this.startDate = selectedDate;
        this.startTime = null; // Reset start time when selecting a new date
        this.endDate = null;
        this.endTime = null;
      } else {
        this.endDate = selectedDate;
        if (this.startDate > this.endDate) {
          [this.startDate, this.endDate] = [this.endDate, this.startDate];
        }
      }
    },
    resetDates() {
      this.startDate = null;
      this.endDate = null;
      this.startTime = null;
      this.endTime = null;
    },
    saveDates() {
      // Если есть начальная и конечная дата
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const dates = [];

        // Генерируем все даты между startDate и endDate
        while (start <= end) {
          dates.push(new Date(start));
          start.setDate(start.getDate() + 1); // Увеличиваем дату на 1 день
        }

        // Формируем объект для сохранения
        const dateRange = {
          dates: dates, // Массив всех дат в промежутке
          duration: [this.startTime, this.endTime], // Список продолжительности
          formatted: this.formattedDateRange, // Форматированный диапазон
        };

        console.log("Saved date range:", dateRange);
        this.$emit("update:dates", dateRange); // Передача данных наверх
        this.$emit("save", dateRange); // Отправляем данные наверх
      }
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
}
</style>
