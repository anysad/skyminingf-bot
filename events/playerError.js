const player = require("../client/player");

player.on("error", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});