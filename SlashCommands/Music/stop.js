const player = require("../../client/player");

module.exports = {
    name: "stop",
    description: "Stops the queue of the server.",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is currently being played.", ephemeral: true });

        await queue.destroy();

        interaction.followUp({ content: "🛑 | Stopped the current queue." });
    },
};
