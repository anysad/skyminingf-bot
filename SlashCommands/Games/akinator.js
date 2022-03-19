const akinator = require('discord.js-akinator')

module.exports = {
    name: "akinator",
    description: "Think about a thing and Akinator will try to guess it.",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'childmode',
            description: 'Toggles the child mode.',
            type: 'BOOLEAN',
            required: true,
        },
        {
            name: 'gametype',
            description: 'Game type you wanna play.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: "Animal",
                    value: "animal"
                },
                {
                    name: "Character",
                    value: "character"
                },
                {
                    name: "Object",
                    value: "object"
                }
            ],
        }
    ],
    run: async (client, interaction) => {
        akinator(interaction, {
            language: "en",
            childMode: interaction.options.get("childmode").value,
            gameType: interaction.options.get("gametype").value,
            useButtons: true
        })
        interaction.followUp({ content: 'Starting!' })
    },
};
