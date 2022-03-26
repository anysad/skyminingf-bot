const { Command } = require("reconlx");
const player = require("../../client/player");

module.exports = new Command({
    name: "stop",
    description: "Stops the queue of the server.",
    userPermissions: ['MANAGE_MESSAGES'],
    run: async ({ client, interaction }) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is currently being played.", ephemeral: true });

        queue.destroy();

        interaction.followUp({ content: "🛑 | Stopped the current queue." });
    },
});
