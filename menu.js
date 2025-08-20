import { Markup } from "telegraf";

export function showMenu(bot, chatId) {
  bot.telegram.sendMessage(
    chatId,
    "Выбери, кого хочешь увидеть:",{
        reply_markup:{
            keyboard: [
                ['Получить мем кота'],
                ['Получить мем собаки']
            ],
           resize_keyboard: true, 
      one_time_keyboard: false 
        }
    }
  );
}