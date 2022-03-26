const { Command } = require("reconlx");
const player = require("../../client/player");

module.exports = new Command({
    name: "pause",
    description: "Pauses the current playing song.",
    run: async ({ client, interaction }) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is being played." , ephemeral: true });
        const paused = queue.setPaused(true);
        return interaction.followUp({ content: paused ? "⏸ | Paused." : "❌ | The queue is already paused." });
    },
});
