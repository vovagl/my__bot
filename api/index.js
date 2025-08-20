import { Telegraf, Markup } from "telegraf";
import { getCat } from '../cat.js';
import { getDog } from '../dog.js';
import { showMenu } from '../menu.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async ctx => {
  await ctx.replyWithHTML(
    `Привет, ${ctx.from.first_name || 'незнакомец'}! Нажми 'Да' чтобы начать.`,
    Markup.keyboard([['Да']]).resize()
  );
});

bot.on("message", async ctx => {
  try {
    const text = ctx.message.text;
    if (text === "Да") await showMenu(bot, ctx.chat.id);
    else if (text === "Получить мем кота") {
      const cat = await getCat();
      await ctx.reply(cat);
      await showMenu(bot, ctx.chat.id);
    } else if (text === "Получить мем собаки") {
      const dog = await getDog();
      await ctx.reply(dog);
      await showMenu(bot, ctx.chat.id);
    } else {
      await ctx.reply("Такой команды нет 🙂");
      await showMenu(bot, ctx.chat.id);
    }
  } catch (err) {
    console.error("Ошибка в обработчике сообщений:", err);
    await ctx.reply("Произошла ошибка ❌");
    await showMenu(bot, ctx.chat.id);
  }
});

export default async function handler(req, res) {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send("ok");
  } catch (err) {
    console.error("Ошибка serverless функции:", err);
    res.status(500).send("Server error");
  }
}
