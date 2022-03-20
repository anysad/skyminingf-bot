const player = require("../../client/player");

player.on("trackAdd", (queue, track) => {
    queue.metadata.send(`🎶 | **${track.title}** has been added to the queue!`);
});