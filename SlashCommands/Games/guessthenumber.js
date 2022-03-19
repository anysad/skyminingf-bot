const { GuessTheNumber } = require("weky-anysad");

module.exports = {
    name: "guessthenumber",
    description: "add description later lmao",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'publicgame',
            description: 'Choose whether the game will be public or not.',
            type: 'BOOLEAN',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await GuessTheNumber({
            message: interaction,
            embed: {
                title: 'Guess The Number',
                description: 'You have **{{time}}** to guess the number.',
                color: 'RANDOM',
                footer: `Requested by ${interaction.member.user.tag}`,
                timestamp: false
            },
            publicGame: interaction.options.get('publicgame').value,
            number: Math.floor(Math.random() * 51),
            time: 60000,
            winMessage: {
                publicGame:
                    'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
                privateGame:
                    'GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.',
            },
            loseMessage:
                'Better luck next time! The number which I guessed was **{{number}}**.',
            bigNumberMessage: 'No {{author}}! My number is greater than **{{number}}**.',
            smallNumberMessage:
                'No {{author}}! My number is smaller than **{{number}}**.',
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel',
            ongoingMessage:
                "A game is already runnning in <#{{channel}}>. You can't start a new one!",
            returnWinner: false
        })
    },
};
