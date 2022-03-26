const { Command } = require("reconlx");
const player = require("../../client/player");

module.exports = new Command({
    name: "queue",
    description: "Displays current queue of the server.",
    run: async ({ client, interaction }) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No songs are currently playing", ephemeral: true });

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. [**${m.title}**](${m.url}) - ${
                m.requestedBy.tag
            }`;
        });

        return interaction.followUp({
            embeds: [
                {
                    title: "Song Queue",
                    description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${
                                  queue.tracks.length - tracks.length === 1
                                      ? `${
                                            queue.tracks.length - tracks.length
                                        } more track`
                                      : `${
                                            queue.tracks.length - tracks.length
                                        } more tracks`
                              }`
                            : ""
                    }`,
                    color: "RANDOM",
                    fields: [
                        {
                            name: "Now Playing",
                            value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
                        },
                    ],
                    footer: {
                        text: `Requested by ${interaction.member.user.tag}`,
                        icon_url: interaction.user.displayAvatarURL({ dynamic: true })
                    }
                },
            ],
        });
    },
});
