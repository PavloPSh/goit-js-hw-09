
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body')

let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);



function onStartBtnClick() {
    timerId = setInterval(() => {
        
        bodyEl.style.backgroundColor = getRandomHexColor();
        startBtn.disabled = true;
        stopBtn.disabled = false;
   
    }, 1000)
};


function onStopBtnClick() {
    clearInterval(timerId);
    
    startBtn.disabled = false;
    stopBtn.disabled = true; 
};



function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

  