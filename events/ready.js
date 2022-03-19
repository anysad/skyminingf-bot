const client = require("../index");

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`)
    client.user.setPresence({ activities: [{ name: 'SkyMiningF.minehut.gg' }] })
});
