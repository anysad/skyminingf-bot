
const { MessageEmbed } = require('discord.js')
const util = require('minecraft-server-util');
const options = {
    enableSRV: true
};
const request = require('prequest');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'status',
    description: 'Checks current server status.',
    run: async ({ client, interaction }) => {
        var things = (await util.status('SkyMiningF.minehut.gg', 25565, options));
        var anotherthings = await request('https://api.minehut.com/server/skyminingf?byName=true')
        const answer = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('SkyMiningF Server Status')
            .addFields(
                { name: 'Online', value: anotherthings.server.online ? "Yes" : "No", inline: true },
                { name: 'Player Count', value: `${things.players.online}/${things.players.max}`, inline: true },
                { name: 'Version', value: `1.18.1 (Paper)`, inline: true },
                { name: 'Server Plan', value: `${anotherthings.server.activeServerPlan}`, inline: true },
                { name: 'MOTD', value: `${things.motd.clean}`, inline: true },
                { name: 'Credits Per Day', value: `${Math.round(anotherthings.server.credits_per_day)}`, inline: true }
            )
            .setFooter({ text: `Requested by ${interaction.member.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
        return await interaction.followUp({ embeds: [answer] });
    }
})