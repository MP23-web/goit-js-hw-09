
import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  console.log('delay', delay);
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
            timeout: 2000,
            width: '300px',
          })
        );
      } else {
        reject(
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
            timeout: 2000,
            width: '300px'
         })
        );
      }}, delay);
   });   
   

  }
      
function handelSubmit(e) {
  e.preventDefault();

  const formEl = e.currentTarget.elements;

  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);

  for (let position = 1; position <= amount; position ++) {
    createPromise(position, delay)
    .then(value => value)
    .catch(error => error);

    delay += step;
  }
}

refs.form.addEventListener('submit', handelSubmit);
