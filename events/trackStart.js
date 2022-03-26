const player = require("../client/player");

player.on("trackStart", (queue, track) => {
    queue.metadata.channel.send(`🎶 | Started playing: **${track.title}**.`);
});
