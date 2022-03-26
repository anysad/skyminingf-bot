const player = require("../client/player");

player.on("botDisconnect", (queue) => {
    queue.metadata.channel.send("❌ | I was manually disconnected from the voice channel, clearing queue...");
});