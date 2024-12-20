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

deleteButton.addEventListener("touchstart", event => {
    event.preventDefault();
currentNumber = currentNumber.slice(0, -1); // 刪除最後一個字元
input.value = currentNumber; // 更新輸入框顯示
});

enterButton.addEventListener("touchstart", event => {
    event.preventDefault();
    if (currentNumber) { // 確保欄位不是空的
        sound.play();
        announceNumber(currentNumber);
        currentNumber = ""; // 清空數字
        input.value = ""; // 清空輸入框
    } else {
      alert("請輸入取餐編號！");
    }
  });

  function announceNumber(number) {
  if (!window.speechSynthesis) {
    alert("您的瀏覽器不支持語音功能！");
    return;
  }

  const synth = window.speechSynthesis; // 語音 API
  const utterance = new SpeechSynthesisUtterance(`請取餐號碼 ${number}`); // 中文播報
  utterance.lang = "zh-TW"; // 設定語言為中文

  // 語音播放完成後的回調
  utterance.onend = () => {
    console.log(`語音播報完成：${number}`);
  };

  // 處理錯誤（例如語音播放被阻止）
  utterance.onerror = (event) => {
    console.error("語音播放出錯：", event.error);
    alert("語音播放失敗，請檢查設備音效或瀏覽器設定！");
  };

  // 播放語音
  synth.speak(utterance);
}

document.getElementById("testVoice").addEventListener("touchstart", event => {
    event.preventDefault();
    const utterance = new SpeechSynthesisUtterance("這是一個測試");
    utterance.lang = "zh-TW";
    utterance.onerror = () => alert("語音功能失敗，請檢查瀏覽器或設備設置！");
    speechSynthesis.speak(utterance);
});
