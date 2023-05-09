import Binance from 'binance-api-node'
import TelegramBot from 'node-telegram-bot-api'

// API connection
const binanceClient = Binance.default({
  apiKey: '###', // masukkan API key dari binance
  apiSecret: '###', // masukkan API key dari binance
})
const token = '###' // masukkan API token telegram bot
const bot = new TelegramBot(token, {polling: true})

// tes API connection
console.log(await binanceClient.ping())
console.log(await binanceClient.time())

// ambil data BTCUSDT harga trading futures
console.log(await binanceClient.futuresPrices({ symbol: 'BTCUSDT' }))

// inputan "/p [teks apapun dari user]"
bot.onText(/\/p (.+)/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, '_Permintaan sedang diproses 🐳_', { parse_mode: "Markdown" });

  const coinName = match[1]; //ambil nama body text
  var harga = []
  
  binanceClient.futuresPrices({ symbol: `${coinName}USDT`.toUpperCase() })
    .then((futuresPrices) => {
        var harga = Object.values(futuresPrices)
        const konversiHarga = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(harga)

        console.log(konversiHarga)
        bot.sendMessage(chatId, `Harga ${coinName.toUpperCase()}/USDT adalah *${konversiHarga}*`, { parse_mode: "Markdown" })
    })
    .catch((err) =>
        bot.sendMessage(chatId, `Gagal mendapatkan harga ${coinName.toUpperCase()}/USDT. ${err}`)
    ) 
});