const { Command } = require("reconlx");
const player = require("../../client/player");

module.exports = new Command({
    name: "skip",
    description: "Skips the current playing song.",
    userPermissions: ['MANAGE_MESSAGES'],
    run: async ({ client, interaction }) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is currently being played.", ephemeral: true });

        queue.skip();

        interaction.followUp({ content: "🎶 | Skipped the current track!" });
    },
});
