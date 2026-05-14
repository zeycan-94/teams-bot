require('dotenv').config();

const express = require('express');
const { BotFrameworkAdapter, ActivityHandler } = require('botbuilder');

const adapter = new BotFrameworkAdapter({
    appId: ''19108ed9-ea85-4f8c-ad05-54873fc22f84',',
    appPassword: 'ztq8Q~wK6e2hIMM2mTq6QmrY0KnkxrO...'
});

class TeamsBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const text = context.activity.text.toLowerCase();
            if (text.includes('merhaba')) {
                await context.sendActivity('Merhaba 👋');
            } else if (text.includes('ping')) {
                await context.sendActivity('pong 🏓');
            } else {
                await context.sendActivity('Mesajını aldım 🙂');
            }
            await next();
        });
    }
}

const bot = new TeamsBot();
const app = express();
app.use(express.json());

app.listen(3978, () => {
    console.log('Bot çalışıyor');
});

app.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});