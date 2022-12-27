import Notiflix, { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let inputElement = document.querySelector('#datetime-picker');
const buttonElement = document.querySelector('button[data-start]');
buttonElement.disabled = true;

const ref = {
    daysElement: document.querySelector('[data-days]'),
    hoursElement: document.querySelector('[data-hours]'),
    minutesElement: document.querySelector('[data-minutes]'),
    secondsElement: document.querySelector('[data-seconds]'),
};

const { daysElement, hoursElement, minutesElement, secondsElement } = ref;
const date = new Date();
inputElement.value = date;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     if (selectedDates[0] < options.defaultDate) {
        return Notify.failure('Please choose a date in the future');
     }
     buttonElement.disabled = false;
    },
  };

  flatpickr('#datetime-picker', options);

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  function updateTime() {
    setInterval(() => {
        const selectedTime = new Date(inputElement.value);
        const currentTime = new Date();
        const time = selectedTime - currentTime;
        if (time < 0) {
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(time);
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }, 1000);
  }

  buttonElement.addEventListener('click', updateTime);