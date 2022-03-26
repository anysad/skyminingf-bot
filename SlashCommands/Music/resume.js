const { Command } = require("reconlx");
const player = require("../../client/player");

module.exports = new Command({
    name: "resume",
    description: "Resumes the current playing song.",
    run: async ({ client, interaction }) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is being played.", ephemeral: true });
        const paused = queue.setPaused(false);
        return interaction.followUp({ content: !paused ? "❌ | The queue is already resumed." : "▶ | Resumed." });
    },
});
