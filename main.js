let TelegramBot, Controllers, TOKEN, bot;
    TelegramBot = require('node-telegram-bot-api');
    Controllers = require('./controller');
    ({TOKEN} = require('./config'));
 const options = {
    polling: true

};

bot = new TelegramBot(TOKEN, options);
//CHECKED AUTH USER
bot.onText(/\/start/, (message) => Controllers.CheckedUser(message, bot))
//AUTH USER
bot.on('text', (message) => Controllers.MessageController(message, bot))
bot.on('text', (message) => Controllers.CompleteFegistration (message, bot))


console.log('Running server!');
