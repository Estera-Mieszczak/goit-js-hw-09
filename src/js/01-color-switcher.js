const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.body;
let timerId = null;
btnStop.disabled = true;

btnStart.addEventListener("click", () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
});

btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
})
