const player = require("../client/player");

player.on("queueEnd", (queue) => {
    queue.metadata.send("✅ | Queue finished!");
});