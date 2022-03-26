const { Command } = require("reconlx");
const player = require("../../client/player");

module.exports = new Command({
    name: "volume",
    description: "Changes or checks the volume of the server queue.",
    options: [
        {
            name: "percentage",
            description: "Percentage to change the volume to.",
            type: "NUMBER",
            required: false,
        },
    ],
    run: async ({ client, interaction }) => {
        const volumePercentage = interaction.options.getInteger("percentage");
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is currently being played.", ephemeral: true });

        if (!volumePercentage) return interaction.followUp({ content: `🎧 | The current volume is \`${queue.volume}%\`.` });

        if (volumePercentage < 0 || volumePercentage > 100) return interaction.followUp({ content: "❌ | The volume must be betweeen 1 and 100.", ephemeral: true });

        queue.setVolume(volumePercentage);

        return interaction.followUp({ content: `🎧 | Volume has been set to \`${volumePercentage}%\`.` });
    },
});
