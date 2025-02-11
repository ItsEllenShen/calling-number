let ws;
const connectWebSocket = () => {
    ws = new WebSocket('wss://staff-calling.onrender.com');
    const currentNumberDisplay = document.getElementById("currentNumber");
    const sound = document.getElementById("dingSound");
    const enableAudioButton = document.getElementById("enableAudio");

    let isAudioEnabled = false;

    // 啟用音效按鈕的事件監聽器
    enableAudioButton.addEventListener('touchstart', event => {
        event.preventDefault();
        sound.play().then(() => {
            isAudioEnabled = true;
            enableAudioButton.style.display = 'none'; // 隱藏按鈕
            console.log('音效已啟用');
        }).catch((error) => {
            console.error('音效啟用失敗:', error);
        });
    });

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
                if (isAudioEnabled) {
                    sound.currentTime = 0; // 從頭播放音效
                    sound.play().catch((error) => {
                        console.error('音效播放失敗:', error);
                    });
                }

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
        setTimeout(connectWebSocket, 1000); // 自動重連
    });

    // GIF 切換邏輯
    const gifs = document.querySelectorAll('.gif-container img');
    let currentGif = 0;

    function changeGif() {
        gifs[currentGif].classList.remove('active');
        currentGif = (currentGif + 1) % gifs.length;
        gifs[currentGif].classList.add('active');
    }

    // 每隔 5 秒換一個 GIF
    setInterval(changeGif, 5000);
};

// 初始化 WebSocket
connectWebSocket();
