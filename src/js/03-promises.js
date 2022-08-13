import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-bottom',
  timeout: 2000,
});

const formContainer = document.querySelector('.form');
formContainer.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(event.target.delay.value);
  const delayStep = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);
  
  promiseCounter(firstDelay, delayStep, amount)
  
};

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  
};

function promiseCounter(firstDelay, delayStep, amount) {
  for (let i = 1; i <= amount; i += 1){
    let total = firstDelay + delayStep * (i - 1);
    createPromise(i, total)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
  };
};



