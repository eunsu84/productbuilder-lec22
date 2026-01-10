const drawButton = document.querySelector("#drawButton");
const resetButton = document.querySelector("#resetButton");
const numbersList = document.querySelector("#numbersList");
const meta = document.querySelector("#meta");

const LOTTO_MAX = 45;
const LOTTO_COUNT = 6;

const padNumber = (value) => String(value).padStart(2, "0");

const createNumbers = () => {
  const pool = Array.from({ length: LOTTO_MAX }, (_, index) => index + 1);
  const picks = [];

  while (picks.length < LOTTO_COUNT) {
    const index = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(index, 1)[0]);
  }

  return picks.sort((a, b) => a - b);
};

const renderNumbers = (numbers) => {
  numbersList.innerHTML = "";

  numbers.forEach((number, index) => {
    const item = document.createElement("li");
    item.className = "ball";
    item.style.animationDelay = `${index * 90}ms`;
    item.textContent = padNumber(number);
    numbersList.append(item);
  });
};

const updateMeta = (numbers) => {
  const timestamp = new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  meta.textContent = `오늘의 추천 번호 · ${timestamp}`;
  meta.dataset.value = numbers.join(", ");
};

const handleDraw = () => {
  const numbers = createNumbers();
  renderNumbers(numbers);
  updateMeta(numbers);
  numbersList.classList.remove("pulse");
  void numbersList.offsetWidth;
  numbersList.classList.add("pulse");
};

const handleReset = () => {
  numbersList.innerHTML = "";
  meta.textContent = "번호를 뽑아주세요.";
  meta.dataset.value = "";
};

drawButton.addEventListener("click", handleDraw);
resetButton.addEventListener("click", handleReset);
