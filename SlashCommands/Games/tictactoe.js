const TTT = require('discord-tictactoe')
const { Command } = require('reconlx')
const game = new TTT({
    language: "en"
})

module.exports = new Command({
    name: "tictactoe",
    description: "Play a game of TTT against your friend or an AI.",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'opponent',
            description: 'Who are you playing against.',
            type: 'USER',
            required: false
        }
    ],
    run: async ({ client, interaction }) => {
        game.handleInteraction(interaction);
    },
});
