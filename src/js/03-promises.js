

const form = document.querySelector(".form");


console.log(form);

  
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resovle({ position, delay });
      } else {
        reject('error');
      }
    });
  })}

form.addEventListener("submit", (event) => {
  event.preventDefault;
  let position = 0;
  let amount = event.currentTarget.form[2].value;
  let delay = event.currentTarget.form[0].value;
  
  timerId = setInterval(() => {
    if (position < amount) {
      createPromise(position, delay)
        .then(value =>
          alert(` Fulfilled promise ${position} in ${delay}ms`)
        )
        .catch(error =>
          alert(`Rejected promise ${position} in ${delay}ms`)
        );
      position += 1;
      delay += event.currentTarget.form[1].value;
    }
    else {
      clearInterval(timerId);
    }
  }, delay);
  
})
