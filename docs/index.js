const input = document.getElementById("numberInput");
const numberButtons = document.querySelectorAll(".number");
const enterButton = document.querySelector(".enter");
const deleteButton = document.querySelector(".delete");
const sound = document.getElementById("dingSound");

let currentNumber = "";

numberButtons.forEach(button => {
    button.addEventListener("touchstart", event => {
        event.preventDefault();
      const value = button.dataset.value; // 取得按鈕的數字
      currentNumber += value; // 將數字加到 currentNumber
      input.value = currentNumber; // 更新輸入框顯示
    });
  });

deleteButton.addEventListener("touchstart", () => {
currentNumber = currentNumber.slice(0, -1); // 刪除最後一個字元
input.value = currentNumber; // 更新輸入框顯示
});

enterButton.addEventListener("touchstart", () => {
    if (currentNumber) { // 確保欄位不是空的
        sound.play();
        const message = `請取餐編號 ${currentNumber} 客人取餐`;
        speak(message);
        currentNumber = ""; // 清空數字
        input.value = ""; // 清空輸入框
    } else {
      alert("請輸入取餐編號！");
    }
  });

function speak(text){
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "zh-TW";
    speech.text = text;
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 2;

    window.speechSynthesis.speak(speech);
};