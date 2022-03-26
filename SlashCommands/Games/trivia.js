const { Trivia } = require("weky-anysad");
const { Command } = require('reconlx')

module.exports = new Command({
    name: "trivia",
    description: "Answer on random question asked by a bot.",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'difficulty',
            description: 'Difficulty of the game.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: "Easy",
                    value: "easy"
                },
                {
                    name: "Medium",
                    value: "medium"
                },
                {
                    name: "Hard",
                    value: "hard"
                }
            ],
        }
    ],
    run: async ({ client, interaction }) => {
        Trivia({
            message: interaction,
            embed: {
                title: 'Trivia',
                description: 'You only have **{{time}}** to guess the answer!',
                color: 'RANDOM',
                footer: `Player - ${interaction.member.user.tag}`,
                timestamp: false
            },
            emojis: {
                one: '1️⃣',
                two: '2️⃣',
                three: '3️⃣',
                four: '4️⃣',
            },
            difficulty: '',
            thinkMessage: 'Thinking',
            winMessage: 'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
            loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            returnWinner: false
        })
    },
});
