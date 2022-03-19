const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];
        const properties = { directory, ...file };
        if (!file?.name) return;
        client.slashCommands.set(file.name, properties);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if(file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild
        const guild = client.guilds.cache.get("913100371533111307");
        await guild.commands.set(arrayOfSlashCommands).then((cmd) => {
            const getRoles = (commandName) => {
                const permissions = arrayOfSlashCommands.find(x => x.name === commandName).userPermissions
                if(!permissions) return null
                return guild.roles.cache.filter(x => x.permissions.has(permissions) && !x.managed)
            }

            const fullPermisions = cmd.reduce((accamulator, x) => {
                const roles = getRoles(x.name)
                if(!roles) return accamulator

                const permissions = roles.reduce((a, v) => {
                    return [
                        ...a,
                        {
                            id: v.id,
                            type: 'ROLE',
                            permission: true,
                        }
                    ]
                }, [])

                return [
                    ...accamulator,
                    {
                        id: x.id,
                        permissions,
                    }
                ]
            }, [])

            guild.commands.permissions.set({ fullPermissions })
        });

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });
};
