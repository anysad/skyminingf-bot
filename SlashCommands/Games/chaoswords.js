const { Command } = require("reconlx");
const { ChaosWords } = require("weky-anysad");

module.exports = new Command({
    name: "chaoswords",
    description: "Find all of the words in the sentence.",
    type: "CHAT_INPUT",
    run: async ({ client, interaction }) => {
        ChaosWords({
            message: interaction,
            embed: {
                title: 'ChaosWords',
                description: 'You have **{{time}}** to find the hidden words in the below sentence.',
                color: '#5865F2',
                field1: 'Sentence:',
                field2: 'Words Found/Remaining Words:',
                field3: 'Words found:',
                field4: 'Words:',
                footer: `Player - ${interaction.member.user.tag}`,
                timestamp: false
            },
            winMessage: 'GG, You won! You made it in **{{time}}**.',
            loseMessage: 'Better luck next time!',
            wrongWordMessage: 'Wrong Guess! You have **{{remaining_tries}}** tries left.',
            correctWordMessage: 'GG, **{{word}}** was correct! You have to find **{{remaining}}** more word(s).',
            time: 60000,
            charGenerated: 17,
            maxTries: 10,
            buttonText: 'Cancel',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        })
    },
});
