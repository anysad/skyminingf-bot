const player = require("../client/player");

player.on("trackAdd", (queue, track) => {
    queue.metadata.channel.send(`🎶 | **${track.title}** has been added to the queue.`);
});