import React, { useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import './DatePicker.css'; // Import your own CSS file for styling
import flatpickr from 'flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPresentDates } from '../../actions/attendanceAction';

const MyDatePicker = () => {
    const dispatch = useDispatch();
  const { loading, presentDates, error } = useSelector(
    (state) => state.attendance
  );

  useEffect(() => {
    dispatch(fetchPresentDates("64e0d01a427d401ab32052e9"));
  }, [dispatch]);
console.log(presentDates)
  useEffect(() => {
    const instance = flatpickr("#datepicker", {
      dateFormat: "Y-m-d",
      inline: true,
      allowInput: true,
      altFormat: "F j, Y",
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
      },
      onReady: function (selectedDates, dateStr, instance) {
        applyHighlighting(instance);
      },
      onMonthChange: function (selectedDates, dateStr, instance) {
        applyHighlighting(instance);
      },
      onValueUpdate: function (selectedDates, dateStr, instance) {
        applyHighlighting(instance);
      },
    });

    function applyHighlighting(instance) {
      const calendarContainer = instance.calendarContainer;
      const days = calendarContainer.querySelectorAll(
        ".flatpickr-days .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)"
      );

      days.forEach(function (day) {
        const date = day.dateObj;
        if (date.getDay() === 0 || date.getDay() === 6) {
          day.classList.add("highlighted-day");
        } else if (isHighlightedDate(date)) {
          day.classList.add("custom-highlighted-day");
        } else {
          day.classList.remove("highlighted-day", "custom-highlighted-day");
        }
      });
    }

    function isHighlightedDate(date) {
      const highlightedDates = [
        "2023-05-31",
        "2023-06-11",
        "2023-08-20",
      ];
      const dateString = date.toISOString().split("T")[0];

      return highlightedDates.includes(dateString);
    }
  }, []); // Empty dependency array ensures the effect runs once after initial render

  return (
    <div id="datepicker" className="date-picker-container">
      {/* Flatpickr calendar will be rendered here */}
    </div>
  );
};

export default MyDatePicker;
