const { WillYouPressTheButton } = require("weky-anysad");

module.exports = {
    name: "willyoupressthebutton",
    description: "One statement is good, the other one is bad. Choose whether you press the button. ",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        await WillYouPressTheButton({
            message: interaction,
            embed: {
                title: 'Will you press the button?',
                description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
                color: 'RANDOM',
                footer: `Asked to ${interaction.member.user.tag}`,
                timestamp: false
            },
            button: { yes: 'Yes', no: 'No' },
            thinkMessage: 'I am thinking',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        })
    },
};
