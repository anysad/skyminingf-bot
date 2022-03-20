const player = require("../client/player");

player.on("trackStart", (queue, track) => {
    queue.metadata.followUp(`🎶 | Started playing: **${track.title}**!`);
});