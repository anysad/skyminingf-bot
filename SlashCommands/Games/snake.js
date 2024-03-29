const { Command } = require("reconlx");
const { Snake } = require("weky-anysad");

module.exports = new Command({
    name: "snake",
    description: "Play snake in your discord server.",
    type: "CHAT_INPUT",
    run: async ({ client, interaction }) => {
        Snake({
            message: interaction,
            embed: {
                title: 'Snake',
                description: 'GG, you scored **{{score}}** points!',
                color: 'RANDOM',
                footer: `Player - ${interaction.member.user.tag}`,
                timestamp: false
            },
            emojis: {
                empty: '⬛',
                snakeBody: '🟩',
                food: '🍎',
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️'
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel'
        })
    },
});
