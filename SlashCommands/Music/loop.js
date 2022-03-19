const player = require("../../client/player");
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: "loop",
    description: "Loops the currect playing song.",
    options: [
        {
            name: 'mode',
            description: 'Loop type you wanna set it to.',
            type: 'INTEGER',
            required: true,
            choices: [
                {
                    name: "Off",
                    value: QueueRepeatMode.OFF
                },
                {
                    name: "Track",
                    value: QueueRepeatMode.TRACK
                },
                {
                    name: "Queue",
                    value: QueueRepeatMode.QUEUE
                },
                {
                    name: "Autoplay",
                    value: QueueRepeatMode.AUTOPLAY
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played." , ephemeral: true });
        const loopMode = interaction.options.get("mode").value;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        return void interaction.followUp({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
    },
};
