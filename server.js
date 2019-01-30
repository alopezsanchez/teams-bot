"use strict";

const restify = require("restify");

const { connector } = require("./bot");
// Local config
const config = require("./config/params");

const server = restify.createServer();

server.post("/api/messages", connector.listen());

server.listen(process.env.PORT || config.port, () => {
  console.log("%s listening to %s", server.name, server.url);
});

module.exports = server;
