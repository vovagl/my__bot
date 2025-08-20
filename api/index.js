import { Telegraf, Markup } from "telegraf";
import dotenv from 'dotenv';
dotenv.config()

import {getCat} from '../cat.js';
import { getDog } from "../dog.js";
import {showMenu} from '../menu.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async ctx =>{
    await ctx.replyWithHTML (
        `Привет,  ${ctx.from.first_name || 'незнакомец'}! Если хочешь посмотреть мемы кошек и собак, нажми 'Да'.`,
        Markup.keyboard([['Да']]).resize()
    );
});

bot.on("message", async ctx =>{
  try{
    const text = ctx.message.text;
    if (text === "Да") {
     await showMenu(bot, ctx.chat.id); 
    }else if (text === "Получить мем кота") {
     await ctx.replyWithHTML("...", Markup.removeKeyboard()); 
    const cat = await getCat();
    await ctx.reply(cat);
    await showMenu(bot, ctx.chat.id); 
  } else if (ctx.message.text === "Получить мем собаки") {
    await ctx.replyWithHTML("...", Markup.removeKeyboard());
    const dog = await getDog();
    await ctx.reply(dog);
    await showMenu(bot, ctx.chat.id); 
  }else {
      await ctx.reply("Такой команды нет 🙂");
      await showMenu(bot, ctx.chat.id); 
    }
  } catch (e) {
    console.error("Ошибка в обработчике сообщений:", e);
    await ctx.reply("Произошла ошибка, попробуй позже ❌");
    await showMenu(bot, ctx.chat.id); 
  }
    })


export default async function handler(req, res) {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send("ok");
  } catch (err) {
    console.error("Ошибка serverless функции:", err);
    res.status(500).send("Server error");
  }
}