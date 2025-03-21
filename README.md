# 匯率換算工具

一個簡單易用的匯率換算工具，可以幫助您比較不同渠道的匯率，找到最佳兌換方案。

## 功能

- USDT 與人民幣雙向匯率計算
- 自動獲取OKX最新匯率
- 商家匯率對比
- 最佳方案推薦
- 歷史記錄保存
- 結果可保存為圖片

## 使用方法

1. 選擇兌換方向（USDT→人民幣 或 人民幣→USDT）
2. 輸入兌換金額
3. 輸入或獲取最新匯率
4. 點擊「計算最佳方案」按鈕
5. 查看結果並做出選擇

## 技術說明

- 純HTML/CSS/JavaScript實現
- 使用OKX API獲取實時匯率
- 響應式設計，適配各種屏幕尺寸
- 本地存儲保存歷史記錄

## 在線使用

訪問 [https://您的用戶名.github.io/exchange-rate-calculator](https://您的用戶名.github.io/exchange-rate-calculator) 即可在線使用此工具。

## 本地運行

直接在瀏覽器中打開`index.html`文件即可使用此工具。

## 微信小程序版本

本工具也可以轉換為微信小程序版本。具體步驟請參考[微信官方文檔](https://developers.weixin.qq.com/miniprogram/dev/framework/)。

## 注意事項

- 當前版本使用模擬數據，實際應用中需要接入OKX平台API獲取真實匯率
- 商家報價請使用CNY/USDT格式（即1 USDT等于多少人民幣）

## 未來改進

- 接入真實的OKX平台API獲取實時匯率
- 添加更多貨幣支持
- 優化用戶界面和用戶體驗
- 添加歷史匯率趨勢圖表 