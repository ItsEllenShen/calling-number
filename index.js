const ws = new WebSocket('wss://staff-calling.onrender.com');
const currentNumberDisplay = document.getElementById("currentNumber");

// 當 WebSocket 連接成功時
ws.addEventListener('open', () => {
    console.log('WebSocket connection established');
});

// 當接收到來自服務器的消息時
ws.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);

    try {
        const data = JSON.parse(event.data); // 嘗試解析消息為 JSON
        if (data.type === 'update' && data.number) {
            // 更新叫號頁面
            currentNumberDisplay.textContent = `${data.number}`;
            currentNumberDisplay.classList.add("blink");

            // 添加動畫結束後移除類名的邏輯
            currentNumberDisplay.addEventListener("animationend", () => {
                currentNumberDisplay.classList.remove("blink");
            }, { once: true });
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
