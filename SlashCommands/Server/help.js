const { MessageEmbed, MessageActionRow, MessageSelectMenu, Message } = require("discord.js");
const { statusFE } = require("minecraft-server-util");

module.exports = {
    name: "help",
    description: "Sends every command under a specific category.",
    run: async (client, interaction) => {
        const emojis = {
            games: '🎲',
            music: '🎶',
            server: '💻',
        }

        const directories = [
            ...new Set(client.slashCommands.map(cmd => cmd.directory))
        ];

        const categories = directories.map((dir) => {
            const getCommands = client.slashCommands.filter(
                (cmd) => cmd.directory === dir
            ).map(cmd => {
                return {
                    name: cmd.name || 'This command doesn\'t have a name.',
                    description: cmd.description || 'This command doesn\'t have a description.'
                };
            });

            return {
                directory: dir,
                commands: getCommands,
            };
        });

        const embed = new MessageEmbed()
            .setDescription('Please choose a category.');

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('help-menu')
                    .setPlaceholder('Please select a category.')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category.`,
                                emoji: emojis[cmd.directory.toLowerCase()] || null
                            }
                        })
                    )
            )
        ];

        const initialMessage = await interaction.followUp({
            embeds: [embed],
            components: components(false)
        });

        const filter = (interaction) => interaction.user.id === interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter, componentType: 'SELECT_MENU', time: 15000
        });

        collector.on('collect', (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const categoryEmbed = new MessageEmbed()
                .setTitle(`${directory} commands.`)
                .setDescription('Here is the list of commands:')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true
                        }
                    })
                )
                .setFooter({ text: `Requested by ${interaction.member.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })

            interaction.update({
                embeds: [categoryEmbed]
            });
        });

        collector.on('end', () => {
            initialMessage.edit({
                components: components(true)
            })
        })

    },
};