const { Fight } = require("weky-anysad");

module.exports = {
    name: "fight",
    description: "Fight a user from the server.",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'opponent',
            description: 'Who are you playing against.',
            type: 'USER',
            required: true
        }
    ],
    run: async (client, interaction) => {
        await Fight({
            message: interaction,
            opponent: interaction.options.getUser('opponent'),
            embed: {
                title: 'Fight',
                color: 'RANDOM',
                footer: `Battle between ${interaction.member.user.tag} and ` + interaction.options.getUser('opponent').tag,
                timestamp: false
            },
            buttons: {
                hit: 'Hit',
                heal: 'Heal',
                cancel: 'Stop',
                accept: 'Accept',
                deny: 'Deny'
              },
            acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
            winMessage: 'GG, <@{{winner}}> won the fight!',
            endMessage: '<@{{opponent}}> didn\'t answer in time. So, I dropped the game!',
            cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
            fightMessage: '{{player}} you go first!',
            opponentsTurnMessage: 'Please wait for your opponents move!',
            highHealthMessage: 'You cannot heal if your HP is above 80!',
            lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
            returnWinner: false,
            othersMessage: 'Only {{author}} can use the buttons!'
        })
    },
};
