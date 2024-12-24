const ws = new WebSocket('wss://staff-calling.onrender.com');
const currentNumberDisplay = document.getElementById("currentNumber");

ws.addEventListener('open', () => {
    console.log('WebSocket connection established');
});

// 當接收到來自服務器的消息時
ws.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);

    // 更新叫號頁面
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        currentNumberDisplay.textContent = `Current Number: ${data.number}`;
    }
});

// 當 WebSocket 連接發生錯誤時
ws.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});

ws.onmessage = (message) => {
    const data = message.data;
    console.log("接收到伺服器消息：", data);

    // 如果資料是 Blob
    if (data instanceof Blob) {
        const reader = new FileReader();
        
        reader.onload = function() {
            try {
                // 嘗試將讀取的文本解析為 JSON
                const jsonData = JSON.parse(reader.result);
                if (jsonData.type === 'update' && jsonData.number) {
                    currentNumberDisplay.textContent = jsonData.number || "-";
                    currentNumberDisplay.classList.add("blink");
                    
                    currentNumberDisplay.addEventListener("animationend", () => {
                        currentNumberDisplay.classList.remove("blink");
                    }, { once: true });
                }
            } catch (e) {
                console.error('無法解析 JSON:', e);
            }
        };

        // 讀取 Blob 資料為文本
        reader.readAsText(data);
    } else {
        // 如果資料是普通文本，直接解析為 JSON
        try {
            const jsonData = JSON.parse(data);
            if (jsonData.type === 'update' && jsonData.number) {
                currentNumberDisplay.textContent = jsonData.number || "-";
                currentNumberDisplay.classList.add("blink");
                
                currentNumberDisplay.addEventListener("animationend", () => {
                    currentNumberDisplay.classList.remove("blink");
                }, { once: true });
            }
        } catch (e) {
            console.error('無法解析 JSON:', e);
        }
    }
};
