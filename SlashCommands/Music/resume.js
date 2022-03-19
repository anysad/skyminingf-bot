const player = require("../../client/player");

module.exports = {
    name: "resume",
    description: "Resumes the current playing song.",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played.", ephemeral: true });
        const paused = queue.setPaused(false);
        return await interaction.followUp({ content: !paused ? "❌ | The queue is already resumed." : "▶ | Resumed." });
    },
};
