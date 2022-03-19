const { DiscordTogether } = require('discord-together');
const { MessageEmbed } = require('discord.js')
const client = require('../..');
client.discordTogether = new DiscordTogether(client);

module.exports = {
    name: "discordtogether",
    description: "Choose an action to do with your friends. (More than 10 games available.)",
    options: [
        {
            name: 'gametype',
            description: 'Game type you wanna do together.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: "Youtube",
                    value: "youtube"
                },
                {
                    name: "Poker",
                    value: "poker"
                },
                {
                    name: "Chess",
                    value: "chess"
                },
                {
                    name: "Checkers in the Park",
                    value: "checkers"
                },
                {
                    name: "Betrayal",
                    value: "betrayal"
                },
                {
                    name: "Fishington",
                    value: "fishing"
                },
                {
                    name: "Letter Tile",
                    value: "lettertile"
                },
                {
                    name: "Words Snack",
                    value: "wordsnack"
                },
                {
                    name: "Doodle Crew",
                    value: "doodlecrew"
                },
                {
                    name: "Spell Cast",
                    value: "spellcast"
                },
                {
                    name: "Awkword",
                    value: "awkword"
                },
                {
                    name: "Puttparty",
                    value: "puttparty"
                },
                {
                    name: "Sketchheads",
                    value: "sketchheads"
                },
                {
                    name: "Ocho",
                    value: "ocho"
                },
            ],
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.voice.channelId) return await interaction.followUp({ content: "❌ | You are not in a voice channel.", ephemeral: true });
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, interaction.options.get("gametype").value).then(async invite => {
            const embed = new MessageEmbed()
                .setTitle('Your code is ready!')
                .setDescription(`🎲 | Here is your code: ${invite.code}.`)
                .setFooter({ text: `Requested by ${interaction.member.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })

            return interaction.followUp({ embeds: [embed] })
        })
    },
};
