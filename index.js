const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Получает на вход количество секунд и приводит к виду hh:mm:ss
const timer = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - (hours * 3600)) / 60);
  const secondsInTimer = seconds % 60;
  timerEl.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${secondsInTimer < 10 ? '0' + secondsInTimer : secondsInTimer}`;
}

const createTimerAnimator = () => {
  let timerInterval;
  return (seconds) => {
    // При каждом нажатии на кнопку происходит очистка и обновление таймера
    clearInterval(timerInterval);
    timer(seconds)
    timerInterval = setInterval(() => {
      seconds--;
      if (seconds === 0) {
        clearInterval(timerInterval);
        timerEl.textContent = 'Time is up!';
      } else {
        timer(seconds)
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  //Таймер начинается с 1 секунды
  if (inputEl.value === "0") {
    inputEl.value = "";
  }
  const regex = /[^0-9]/g;
  inputEl.value = inputEl.value.replace(regex, '');
});


buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  if(seconds > 86400)
    alert("Enter number of seconds <= 86400!") // Ограничение на количество секунд. Всего есть 24 часа. При желании это условие можно убрать
  else if(seconds) animateTimer(seconds)
  else alert("Enter number of seconds!");

  inputEl.value = '';
});
