const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "suggest",
    description: "Suggest what you wanna be on the server.",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'suggestion',
            description: 'Suggestion you wanna suggest.',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const response = new MessageEmbed()
            .setTitle('RANDOM')
            .setTitle('New Suggestion!')
            .setDescription(`Suggestion: ` + interaction.options.get('suggestion').value)
            .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
        const message = await interaction.followUp({ embeds: [response], fetchReply: true })
        message.react('👍')
        message.react('👎')
    },
};
