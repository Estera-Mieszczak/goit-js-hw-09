import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");

const amount = Number(form.elements.amount.value);
const delay = Number(form.elements.delay.value);
const step = Number(form.elements.step.value);

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
 
  for (let i = 0; i < amount; i += 1) {
    
    createPromise(i, delay + i * step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
})

// timerId = setInterval(() => {
//     if (position < amount) {
//       createPromise(position, delay)
//         .then(value =>
//           alert(` Fulfilled promise ${position} in ${delay}ms`)
//         )
//         .catch(error =>
//           alert(`Rejected promise ${position} in ${delay}ms`)
//         );
//       position += 1;
//       delay += event.currentTarget.form[1].value;
//     }
//     else {
//       clearInterval(timerId);
//     }
//   }, delay);