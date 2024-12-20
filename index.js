const currentNumberDisplay = document.getElementById("currentNumber");

function updateNumber() {
  // 取得叫號數字
  const number = localStorage.getItem("currentNumber");
  currentNumberDisplay.textContent = number || "-";
  currentNumberDisplay.classList.add("blink");

  currentNumberDisplay.addEventListener("animationend", () => {
    currentNumberDisplay.classList.remove("blink");
  }, { once: true });
}

// 每秒更新一次
setInterval(updateNumber, 1000);
