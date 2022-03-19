const TTT = require('discord-tictactoe')
const game = new TTT({
    language: "en"
})

module.exports = {
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
    run: async (client, interaction) => {
        game.handleInteraction(interaction);
    },
};
