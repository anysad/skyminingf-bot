const player = require("../client/player");

player.on("botDisconnect", (queue) => {
    queue.metadata.followUp("❌ | I was manually disconnected from the voice channel, clearing queue!");
}); 