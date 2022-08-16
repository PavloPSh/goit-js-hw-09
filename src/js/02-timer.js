import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const timerRefs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let selectedTime;
let timerId = null;


startBtn.disabled = true;




const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);


        if(selectedDates[0] < new Date()){
            Notiflix.Notify.failure(
                "Please choose a date in the future",
                function cb() {
                },
              );
        
            return;
        };
        

        if(selectedDates[0]){
            startBtn.disabled = false;
        }

        selectedTime = selectedDates[0];


    
    },
  };


flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartBtnClick);


function updateTimerValues({ days, hours, minutes, seconds }) {
    
    timerRefs.days.textContent = `${days}`;
    timerRefs.hours.textContent = `${hours}`;
    timerRefs.minutes.textContent = `${minutes}`;
    timerRefs.seconds.textContent = `${seconds}`;
    };

function onStartBtnClick() {
    timer.start()
    startBtn.disabled = true;
    
    };

const timer = {

    start () {
        timerId = setInterval( () => {
            const delta = selectedTime - new Date ();
            const timeComponents = convertMs(delta);
            updateTimerValues(timeComponents);
            if(delta <= 999){
                clearInterval(timerId)
                Notiflix.Notify.success('Ta-daaa')
            }
        }, 1000)
    }
    };

function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      
        return { days, hours, minutes, seconds };
    };

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
    };






