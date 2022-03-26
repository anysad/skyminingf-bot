const player = require("../client/player");

player.on("queueEnd", (queue) => {
    queue.metadata.channel.send("✅ | Queue finished!");
});