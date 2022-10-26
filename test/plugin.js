module.exports.plugin = {
    name: 'test-plugin',
    description: 'hee hee hee haw',
    author: 'cum monster',
    repository: 'https://github.com/alexanderdavidj/test/blob/main/test/plugin.js',
    commands: [
        'test',
    ]
}

module.exports.test = {
    name: 'test',
    description: 'a test command',
    run: async (client, message) => {
        message.reply({ content: client.token })
    }
}
