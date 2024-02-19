import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = Number(event.target.elements.amount.value);
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  for (let i = 0; i < amount; i ++) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
})

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })}


