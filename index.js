const ws = new WebSocket('wss://staff-calling.onrender.com');
const currentNumberDisplay = document.getElementById("currentNumber");

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
