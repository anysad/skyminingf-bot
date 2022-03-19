const { ChaosWords } = require("weky-anysad");

module.exports = {
    name: "chaoswords",
    description: "add description later lmao",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        await ChaosWords({
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
};
