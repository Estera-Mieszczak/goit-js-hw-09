import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const startBtn = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const calendar = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        const currentTime = new Date();
        if (selectedDates[0] < currentTime) {
            alert("Please choose a date in the future");
        }
        else {
            startBtn.disabled = false;
            return selectedDates[0];
        }
  },
});

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

startBtn.addEventListener("click", () => {
    const timerId = setInterval(() => {
        const currentTime = new Date();
        const selectedTime = new Date(calendar.selectedDates[0]);
        const ms = selectedTime - currentTime;
        const newTime = convertMs(ms);
        daysField.innerHTML = addLeadingZero(newTime.days);
        hoursField.innerHTML = addLeadingZero(newTime.hours);
        minutesField.innerHTML = addLeadingZero(newTime.minutes);
        secondsField.innerHTML = addLeadingZero(newTime.seconds);
        if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
            clearInterval(timerId);
        }
    }, 1000);
    }
);



function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days
  const days = Math.floor(ms / day);
// Remaining hours
  const hours = Math.floor((ms % day) / hour);
// Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));// {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000));// {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000));// {days: 0, hours: 6 minutes: 42, seconds: 20}


//  if (this.selectedDates.getTime < this.deafultDate.getTime) {
//             window.alert("Please choose a date in the future");
//       } 

// if (selectedDates < deafultDate) {
//             window.alert("Please choose a date in the future");
//       }