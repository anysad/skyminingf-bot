const player = require("../client/player");

player.on("trackAdd", (queue, track) => {
    queue.metadata.followUp(`🎶 | **${track.title}** has been added to the queue!`);
});