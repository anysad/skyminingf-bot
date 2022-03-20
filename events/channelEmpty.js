const player = require("../client/player");

player.on("channelEmpty", (queue) => {
    queue.metadata.followUp("❌ | Nobody is in the voice channel, leaving...");
});