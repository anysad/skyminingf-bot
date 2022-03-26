const player = require("../client/player");

player.on("channelEmpty", (queue) => {
    queue.metadata.channel.send("❌ | Nobody is in the voice channel, leaving...");
});