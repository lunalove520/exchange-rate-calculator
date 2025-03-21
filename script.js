document.addEventListener('DOMContentLoaded', function() {
    // DOM元素選擇器
    const usdtToCnyBtn = document.getElementById('usdtToCnyBtn');
    const cnyToUsdtBtn = document.getElementById('cnyToUsdtBtn');
    const usdtToCnyForm = document.getElementById('usdtToCnyForm');
    const cnyToUsdtForm = document.getElementById('cnyToUsdtForm');
    const amountDisplay = document.getElementById('amountDisplay');
    const currencyDisplay = document.getElementById('currencyDisplay');
    const calculateUsdtToCny = document.getElementById('calculateUsdtToCny');
    const calculateCnyToUsdt = document.getElementById('calculateCnyToUsdt');
    const gameResultCard = document.getElementById('gameResultCard');
    const newCalculation = document.getElementById('newCalculation');
    const saveAsImage = document.getElementById('saveAsImage');
    const viewHistory = document.getElementById('viewHistory');
    const historyPanel = document.getElementById('historyPanel');
    const closeHistory = document.getElementById('closeHistory');
    const historyRecords = document.getElementById('historyRecords');
    const okxExchangeResult = document.getElementById('okxExchangeResult');

    // 匯率輸入欄位
    const usdtAmount = document.getElementById('usdtAmount');
    const cnyAmount = document.getElementById('cnyAmount');
    const okxRate = document.getElementById('okxRate');
    const okxResult = document.getElementById('okxResult');
    const kuRate = document.getElementById('kuRate');
    const merchantARateUsdtToCny = document.getElementById('merchantARateUsdtToCny');
    const merchantBRateUsdtToCny = document.getElementById('merchantBRateUsdtToCny');
    const okxRateCny = document.getElementById('okxRateCny');
    const okxResultCny = document.getElementById('okxResultCny');
    const kuRateCny = document.getElementById('kuRateCny');
    const merchantARateCnyToUsdt = document.getElementById('merchantARateCnyToUsdt');
    const merchantBRateCnyToUsdt = document.getElementById('merchantBRateCnyToUsdt');
    const merchantACardCny = document.getElementById('merchantACardCny');
    const merchantBCardCny = document.getElementById('merchantBCardCny');

    // 結果顯示元素
    const kuRateLevel = document.getElementById('kuRateLevel');
    const okxRateLevel = document.getElementById('okxRateLevel');
    const currentDate = document.getElementById('currentDate');
    const bestChoice = document.getElementById('bestChoice');
    const bestRateInfo = document.getElementById('bestRateInfo');
    const merchantAOption = document.getElementById('merchantAOption');
    const merchantBOption = document.getElementById('merchantBOption');
    const merchantAAmount = document.getElementById('merchantAAmount');
    const merchantBAmount = document.getElementById('merchantBAmount');
    const merchantARate = document.getElementById('merchantARate');
    const merchantBRate = document.getElementById('merchantBRate');
    const merchantAKuAmount = document.getElementById('merchantAKuAmount');
    const merchantBKuAmount = document.getElementById('merchantBKuAmount');
    const differenceAmount = document.getElementById('differenceAmount');
    
    // 歷史記錄數組
    let calculationHistory = loadHistory();

    // 方向切換
    usdtToCnyBtn.addEventListener('click', function() {
        usdtToCnyBtn.classList.add('active');
        cnyToUsdtBtn.classList.remove('active');
        usdtToCnyForm.classList.remove('hidden');
        cnyToUsdtForm.classList.add('hidden');
        gameResultCard.classList.add('hidden');
        amountDisplay.textContent = usdtAmount.value;
        currencyDisplay.textContent = 'USDT';
    });

    cnyToUsdtBtn.addEventListener('click', function() {
        cnyToUsdtBtn.classList.add('active');
        usdtToCnyBtn.classList.remove('active');
        cnyToUsdtForm.classList.remove('hidden');
        usdtToCnyForm.classList.add('hidden');
        gameResultCard.classList.add('hidden');
        amountDisplay.textContent = cnyAmount.value;
        currencyDisplay.textContent = '人民幣';
    });

    // 更新顯示金額
    usdtAmount.addEventListener('input', function() {
        if (usdtToCnyBtn.classList.contains('active')) {
            amountDisplay.textContent = this.value;
            updateOkxResult();
        }
    });

    cnyAmount.addEventListener('input', function() {
        if (cnyToUsdtBtn.classList.contains('active')) {
            amountDisplay.textContent = this.value;
            updateOkxResultCny();
        }
    });

    // 根據OKX匯率更新計算結果
    function updateOkxResult() {
        const usdtAmountValue = parseFloat(usdtAmount.value) || 0;
        const okxRateValue = parseFloat(okxRate.value) || 0;
        
        if (okxRateValue && usdtAmountValue) {
            okxResult.textContent = 
                `${usdtAmountValue} USDT ≈ ${(usdtAmountValue * okxRateValue).toFixed(2)} 人民幣`;
        } else {
            okxResult.textContent = '--';
        }
    }

    // 根據OKX匯率更新計算結果（人民幣到USDT）
    function updateOkxResultCny() {
        const cnyAmountValue = parseFloat(cnyAmount.value) || 0;
        const okxRateValue = parseFloat(okxRateCny.value) || 0;
        
        if (okxRateValue && cnyAmountValue) {
            okxResultCny.textContent = 
                `${cnyAmountValue} 人民幣 ≈ ${(cnyAmountValue / okxRateValue).toFixed(4)} USDT`;
        } else {
            okxResultCny.textContent = '--';
        }
    }

    // 更新商家匯率結果
    function updateMerchantResults() {
        const usdtAmountValue = parseFloat(usdtAmount.value) || 0;
        const cnyAmountValue = parseFloat(cnyAmount.value) || 0;
        
        // USDT to 人民幣
        if (merchantARateUsdtToCny.value) {
            const rate = parseFloat(merchantARateUsdtToCny.value);
            document.getElementById('merchantAResultUsdtToCny').textContent = 
                `${usdtAmountValue} USDT ≈ ${(usdtAmountValue * rate).toFixed(2)} 人民幣`;
        }
        
        if (merchantBRateUsdtToCny.value) {
            const rate = parseFloat(merchantBRateUsdtToCny.value);
            document.getElementById('merchantBResultUsdtToCny').textContent = 
                `${usdtAmountValue} USDT ≈ ${(usdtAmountValue * rate).toFixed(2)} 人民幣`;
        }
        
        // 人民幣 to USDT
        if (merchantARateCnyToUsdt.value) {
            const rate = parseFloat(merchantARateCnyToUsdt.value);
            document.getElementById('merchantAResultCnyToUsdt').textContent = 
                `${cnyAmountValue} 人民幣 ≈ ${(cnyAmountValue / rate).toFixed(4)} USDT`;
        }
        
        if (merchantBRateCnyToUsdt.value) {
            const rate = parseFloat(merchantBRateCnyToUsdt.value);
            document.getElementById('merchantBResultCnyToUsdt').textContent = 
                `${cnyAmountValue} 人民幣 ≈ ${(cnyAmountValue / rate).toFixed(4)} USDT`;
        }
    }

    // 檢查商家匯率是否高於KU匯率
    function checkMerchantRates() {
        const kuRateValue = parseFloat(kuRateCny.value);
        if (!kuRateValue) return;
        
        const rateA = parseFloat(merchantARateCnyToUsdt.value);
        const rateB = parseFloat(merchantBRateCnyToUsdt.value);
        
        // 人民幣到USDT時，匯率越低越好，但如果高於KU則警示
        if (!isNaN(rateA) && rateA > kuRateValue) {
            merchantACardCny.classList.add('warning');
        } else {
            merchantACardCny.classList.remove('warning');
        }
        
        if (!isNaN(rateB) && rateB > kuRateValue) {
            merchantBCardCny.classList.add('warning');
        } else {
            merchantBCardCny.classList.remove('warning');
        }
    }

    // USDT到人民幣計算
    calculateUsdtToCny.addEventListener('click', function() {
        const usdtAmountValue = parseFloat(usdtAmount.value);
        const okxRateValue = parseFloat(okxRate.value);
        const kuRateValue = parseFloat(kuRate.value);
        const merchantARateValue = parseFloat(merchantARateUsdtToCny.value);
        const merchantBRateValue = parseFloat(merchantBRateUsdtToCny.value);

        // 驗證輸入
        if (!usdtAmountValue || !merchantARateValue || !merchantBRateValue) {
            alert('請填寫USDT金額和商家匯率');
            return;
        }

        // 計算結果
        const merchantATotal = (usdtAmountValue * merchantARateValue).toFixed(2);
        const merchantBTotal = (usdtAmountValue * merchantBRateValue).toFixed(2);
        
        // 顯示遊戲式結果頁面
        displayGameResult('USDT to 人民幣', usdtAmountValue, merchantARateValue, merchantBRateValue, merchantATotal, merchantBTotal, okxRateValue, kuRateValue);
        
        // 保存記錄
        saveCalculation('USDT to 人民幣', usdtAmountValue, merchantARateValue, merchantBRateValue, merchantATotal, merchantBTotal, merchantARateValue > merchantBRateValue ? 'A' : 'B');
    });

    // 人民幣到USDT計算
    calculateCnyToUsdt.addEventListener('click', function() {
        const cnyAmountValue = parseFloat(cnyAmount.value);
        const okxRateValue = parseFloat(okxRateCny.value);
        const kuRateValue = parseFloat(kuRateCny.value);
        const merchantARateValue = parseFloat(merchantARateCnyToUsdt.value);
        const merchantBRateValue = parseFloat(merchantBRateCnyToUsdt.value);

        // 驗證輸入
        if (!cnyAmountValue || !merchantARateValue || !merchantBRateValue) {
            alert('請填寫人民幣金額和商家匯率');
            return;
        }

        // 計算結果
        const merchantATotal = (cnyAmountValue / merchantARateValue).toFixed(4);
        const merchantBTotal = (cnyAmountValue / merchantBRateValue).toFixed(4);
        
        // 顯示遊戲式結果頁面
        displayGameResult('人民幣 to USDT', cnyAmountValue, merchantARateValue, merchantBRateValue, merchantATotal, merchantBTotal, okxRateValue, kuRateValue);
        
        // 保存記錄
        saveCalculation('人民幣 to USDT', cnyAmountValue, merchantARateValue, merchantBRateValue, merchantATotal, merchantBTotal, merchantARateValue < merchantBRateValue ? 'A' : 'B');
    });

    // 顯示遊戲式結果
    function displayGameResult(direction, amount, rateA, rateB, totalA, totalB, okxRate, kuRateValue) {
        // 設置當前日期
        const date = new Date();
        currentDate.textContent = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

        // 設置匯率等級
        kuRateLevel.textContent = kuRateValue || '--';
        okxRateLevel.textContent = okxRate || '--';

        // 設置OKX換算結果
        if (okxRate) {
            if (direction === 'USDT to 人民幣') {
                // 如果是USDT到人民幣，計算OKX結果
                const okxTotal = (amount * okxRate).toFixed(2);
                okxExchangeResult.textContent = `￥${parseFloat(okxTotal).toLocaleString('zh-CN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            } else {
                // 如果是人民幣到USDT，計算OKX結果
                const okxTotal = (amount / okxRate).toFixed(4);
                okxExchangeResult.textContent = `${parseFloat(okxTotal).toLocaleString('zh-CN', {minimumFractionDigits: 4, maximumFractionDigits: 4})} USDT`;
            }
        } else {
            okxExchangeResult.textContent = '-- (請輸入OKX匯率)';
        }

        // 判斷哪個商家更好
        let isMerchantABetter;
        if (direction === 'USDT to 人民幣') {
            // USDT到人民幣時，匯率越高越好
            isMerchantABetter = rateA > rateB;
        } else {
            // 人民幣到USDT時，匯率越低越好
            isMerchantABetter = rateA < rateB;
        }

        // 設置勝出商家和匯率
        if (isMerchantABetter) {
            bestChoice.textContent = '商家 A';
            bestRateInfo.textContent = `匯率: ${rateA.toFixed(2)}`;
            merchantAOption.classList.add('winner');
            merchantBOption.classList.remove('winner');
        } else {
            bestChoice.textContent = '商家 B';
            bestRateInfo.textContent = `匯率: ${rateB.toFixed(2)}`;
            merchantBOption.classList.add('winner');
            merchantAOption.classList.remove('winner');
        }

        // 設置金額和匯率
        if (direction === 'USDT to 人民幣') {
            merchantAAmount.textContent = `￥${parseFloat(totalA).toLocaleString('zh-CN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            merchantBAmount.textContent = `￥${parseFloat(totalB).toLocaleString('zh-CN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            
            // USDT到人民幣時，隱藏KU到帳金額
            merchantAKuAmount.style.display = 'none';
            merchantBKuAmount.style.display = 'none';
        } else {
            merchantAAmount.textContent = `${parseFloat(totalA).toLocaleString('zh-CN', {minimumFractionDigits: 4, maximumFractionDigits: 4})} USDT`;
            merchantBAmount.textContent = `${parseFloat(totalB).toLocaleString('zh-CN', {minimumFractionDigits: 4, maximumFractionDigits: 4})} USDT`;
            
            // 顯示人民幣到USDT時的KU到帳金額
            merchantAKuAmount.style.display = 'block';
            merchantBKuAmount.style.display = 'block';
            
            if (kuRateValue) {
                const merchantAKuAmountValue = (parseFloat(totalA) * kuRateValue).toFixed(2);
                const merchantBKuAmountValue = (parseFloat(totalB) * kuRateValue).toFixed(2);
                
                merchantAKuAmount.textContent = `KU到帳金額: ￥${parseFloat(merchantAKuAmountValue).toLocaleString('zh-CN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                merchantBKuAmount.textContent = `KU到帳金額: ￥${parseFloat(merchantBKuAmountValue).toLocaleString('zh-CN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            } else {
                merchantAKuAmount.textContent = `KU到帳金額: --`;
                merchantBKuAmount.textContent = `KU到帳金額: --`;
            }
        }
        merchantARate.textContent = `匯率: ${rateA.toFixed(2)}`;
        merchantBRate.textContent = `匯率: ${rateB.toFixed(2)}`;

        // 計算並顯示差額
        if (direction === 'USDT to 人民幣') {
            const diff = Math.abs(parseFloat(totalA) - parseFloat(totalB)).toFixed(2);
            differenceAmount.textContent = `￥${parseFloat(diff).toLocaleString('zh-CN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        } else {
            const diff = Math.abs(parseFloat(totalA) - parseFloat(totalB)).toFixed(4);
            differenceAmount.textContent = `${parseFloat(diff).toLocaleString('zh-CN', {minimumFractionDigits: 4, maximumFractionDigits: 4})} USDT`;
        }

        // 顯示結果卡片
        gameResultCard.classList.remove('hidden');
        window.scrollTo({
            top: gameResultCard.offsetTop,
            behavior: 'smooth'
        });
    }

    // 保存計算記錄
    function saveCalculation(direction, amount, rateA, rateB, resultA, resultB, bestChoice) {
        const record = {
            timestamp: Date.now(),
            date: new Date().toISOString(),
            direction: direction,
            amount: amount,
            rateA: rateA,
            rateB: rateB,
            resultA: resultA,
            resultB: resultB,
            bestChoice: bestChoice,
            difference: Math.abs(parseFloat(resultA) - parseFloat(resultB)).toFixed(direction.includes('USDT') ? 2 : 4)
        };
        
        calculationHistory.push(record);
        
        // 最多保存50條記錄
        if (calculationHistory.length > 50) {
            calculationHistory.shift();
        }
        
        // 保存到localStorage
        localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
    }

    // 加載歷史記錄
    function loadHistory() {
        const history = localStorage.getItem('calculationHistory');
        return history ? JSON.parse(history) : [];
    }

    // 顯示歷史記錄
    function displayHistory() {
        historyRecords.innerHTML = '';
        
        if (calculationHistory.length === 0) {
            historyRecords.innerHTML = '<p style="color: #888; text-align: center;">無計算記錄</p>';
            return;
        }
        
        // 倒序顯示，最新的記錄在最上面
        calculationHistory.slice().reverse().forEach(record => {
            const date = new Date(record.timestamp);
            const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            
            const recordElement = document.createElement('div');
            recordElement.className = 'history-record';
            
            let unit = record.direction.includes('USDT') ? '人民幣' : 'USDT';
            let amountUnit = record.direction.includes('USDT') ? 'USDT' : '人民幣';
            
            recordElement.innerHTML = `
                <div class="history-record-header">
                    <span>${formattedDate}</span>
                </div>
                <div class="history-record-content">
                    <div class="record-direction">${record.direction} (${record.amount} ${amountUnit})</div>
                    <div>商家A: ${record.rateA.toFixed(2)} | 商家B: ${record.rateB.toFixed(2)}</div>
                    <div class="record-result">
                        <div class="record-choice">最佳選擇: 商家 ${record.bestChoice}</div>
                        <div class="record-difference">多換了: ${record.difference} ${unit}</div>
                    </div>
                </div>
            `;
            
            historyRecords.appendChild(recordElement);
        });
    }

    // 查看歷史記錄
    viewHistory.addEventListener('click', function() {
        displayHistory();
        historyPanel.classList.remove('hidden');
    });

    // 關閉歷史記錄
    closeHistory.addEventListener('click', function() {
        historyPanel.classList.add('hidden');
    });

    // 重新計算按鈕
    newCalculation.addEventListener('click', function() {
        gameResultCard.classList.add('hidden');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 保存圖片功能
    saveAsImage.addEventListener('click', function() {
        html2canvas(gameResultCard).then(function(canvas) {
            // 創建下載鏈接
            const link = document.createElement('a');
            link.download = '匯率比較結果_' + new Date().toISOString().split('T')[0] + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // 添加html2canvas庫
    function loadHTML2Canvas() {
        if (window.html2canvas) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 添加監聽器
    kuRateCny.addEventListener('input', checkMerchantRates);
    merchantARateCnyToUsdt.addEventListener('input', function() {
        updateMerchantResults();
        checkMerchantRates();
    });
    merchantBRateCnyToUsdt.addEventListener('input', function() {
        updateMerchantResults();
        checkMerchantRates();
    });
    
    usdtAmount.addEventListener('input', updateMerchantResults);
    cnyAmount.addEventListener('input', updateMerchantResults);
    merchantARateUsdtToCny.addEventListener('input', updateMerchantResults);
    merchantBRateUsdtToCny.addEventListener('input', updateMerchantResults);
    kuRate.addEventListener('input', updateMerchantResults);
    
    // 添加OKX匯率輸入監聽器
    okxRate.addEventListener('input', updateOkxResult);
    okxRateCny.addEventListener('input', updateOkxResultCny);

    // 載入html2canvas庫
    loadHTML2Canvas().catch(console.error);
}); 