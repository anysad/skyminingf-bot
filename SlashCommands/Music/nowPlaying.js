const player = require("../../client/player");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "now-playing",
    description: "Shows information about the current song.",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is currently being played.", ephemeral: true });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Now Playing')
            .setDescription(`🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)\n${queue.current.requestedBy.tag}`)
            .addField('\u200b', progress)
            .setFooter({ text: `Requested by ${interaction.member.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })

        return interaction.followUp({ embeds: [embed] });
    },
};
