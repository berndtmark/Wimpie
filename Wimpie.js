// removes irrelevant warning
process.env.NTBA_FIX_319 = 1;

const telegramBot = require('node-telegram-bot-api');
const config = require("./config.json");
const shell = require("shelljs")

const bot = new telegramBot(config.token, {polling: true});

bot.onText(/\/run (.+)/, (msg, match) => {
    const command = match[1];

    var result = shell.exec(`${config.path}/${command}.sh`);

    if (result.code === 0) {
        bot.sendMessage(msg.chat.id, `${result.stdout}`);
    }
    else  {
        bot.sendMessage(msg.chat.id, result.stderr);
    }
});

console.log(`Connected!`);