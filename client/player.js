const { Player } = require("discord-player");
const client = require("../index.js");

const player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
    initialVolume: 50
});

module.exports = player;
