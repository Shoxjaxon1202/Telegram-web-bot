const TelegramBot = require("node-telegram-bot-api");
const token = "7908074163:AAE8PKJ7OFmCSyA6jY9lbuZg002p7zSoRaQ";

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.setMyCommands([
    {
      command: "start",
      description: "Botni ishga tushirish",
    },
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // `/start` komandasi
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Ustozlar hisoboti bo'limiga xush kelibsiz!",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Ustozlar hisoboti",
                  web_app: {
                    url: "https://sammi.ac", // Bu URL dinamik ravishda o'zgarishi mumkin
                  },
                },
              ],
            ],
            resize_keyboard: true, // Klaviatura tugmalarini moslashtiradi
            one_time_keyboard: false, // Tugmalar botni yopganda ham ko'rinadi
          },
        }
      );
    }
  });
};

bootstrap();
