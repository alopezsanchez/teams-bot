"use strict";

const builder = require("botbuilder");
const teams = require("botbuilder-teams");

// Local config
const config = require("./config/params");
// Messages
const messages = require("./config/messages");

let savedAddress = null;

// setup bot credentials
const connector = new teams.TeamsChatConnector({
  appId: process.env.MICROSOFT_APP_ID || config.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD || config.MICROSOFT_APP_PASSWORD
});

// Bot Storage: Here we register the state storage for your bot.
// Default store: volatile in-memory store - Only for prototyping!
// We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
// For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
const inMemoryStorage = new builder.MemoryBotStorage();

const bot = new builder.UniversalBot(connector)
  .set("storage", inMemoryStorage); // Register in memory storage

// handle the proactive initiated dialog
bot.dialog("/daily", (session, args, next) => {
  const incomingMessage = session.message.text;
  if (incomingMessage === config.keyword) {
    session.send(messages.dailyThank(config.teamsChannelName));
    session.endDialog();

    // When done, send incomingMessage to the team channel

  } else if (!incomingMessage) {
    // The dialog start always have text ""
    session.send(messages.dailyMessage(session.message.address.user.name, config.keyword));
  }
});

// initiate a dialog proactively
const startProactiveDialog = address => {
  bot.beginDialog(address, "*:/daily");
}

// root dialog
bot.dialog("/", (session, args) => {
  savedAddress = session.message.address;

  // TODO: format text
  session.send(messages.initConversation(config.project, config.teamsChannelName));

  setTimeout(() => {
    startProactiveDialog(savedAddress);
  }, 5000);
});

module.exports = { bot, connector, savedAddress };
