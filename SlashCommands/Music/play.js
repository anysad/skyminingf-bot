const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
    name: "play",
    description: "Plays a song of your choice in the channel.",
    options: [
        {
            name: "song",
            description: "Name/link of the song you want to play.",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        if (!interaction.member.voice.channelId) return await interaction.followUp({ content: "❌ | You are not in a voice channel.", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({ content: "❌ | You are not in my voice channel.", ephemeral: true });
        const song = interaction.options.get("song").value;
        const queue = await player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: "❌ | Could\'t join your voice channel.", ephemeral: true });
        }

        const searchResult = await player.search(song, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });
        if(!searchResult) return await interaction.followUp({ content: `❌ | Track **${query}** not found.` });

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
        return await interaction.followUp({ content: `🎶 | Loading track **${queue.current.title}**.` });
    },
};
