const ws = new WebSocket('wss://staff-calling.onrender.com');
const currentNumberDisplay = document.getElementById("currentNumber");

// 當 WebSocket 連接成功時
ws.addEventListener('open', () => {
    console.log('WebSocket connection established');
});

// 當接收到來自服務器的消息時
ws.addEventListener('message', (event) => {
    console.log('Message received from server:', event.data); // 日誌檢查消息內容
    try {
        const data = JSON.parse(event.data);
        if (data.type === 'update' && data.number) {
            console.log('Update message received:', data.number); // 確認解析出的數據
            currentNumberDisplay.textContent = `${data.number}`;
            currentNumberDisplay.classList.add("blink");

            // 確保動畫結束後移除類名
            currentNumberDisplay.addEventListener("animationend", () => {
                currentNumberDisplay.classList.remove("blink");
            }, { once: true });
        } else {
            console.warn('Message type not handled:', data.type);
        }
    } catch (error) {
        console.error('Error parsing WebSocket message:', error);
    }
});

// 當 WebSocket 發生錯誤時
ws.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});

// 當 WebSocket 連接關閉時
ws.addEventListener('close', () => {
    console.warn('WebSocket connection closed');
});
