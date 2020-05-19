const discord = require("discord.js");
const bot = new discord.Client();
const token = process.env.TOKEN;

bot.on("ready", () => {
  console.log("You are logged in as " + bot.user.tag);
});
bot.on("message", msg => {
  const botprefix = "p!";
  if (msg.isMemberMentioned(bot.user)) {
    msg.reply(`My prefix is \`\`${botprefix}\`\` biatch`);
  }
  if (msg.content.startsWith(botprefix)) {
    let args = msg.content.split(" ");
    let command = args[0].slice(botprefix.length, args[0].length);
    args.shift();
    command = command.toLowerCase();
    if (command === "add" || command === "addition") {
      const a = parseInt(args[0]);
      const b = parseInt(args[1]);
      msg.channel.send(a + b);
    }
    if (command === "createrole") {
      if (!args[0] || !args[1]) {
        msg.channel.send(
          `Correct Syntax: \`\`${botprefix}createrole name color\`\``
        );
        return;
      }
      msg.guild.createRole({ name: args[0], color: args[1].toUpperCase() });
    }
    if (command === "addrole") {
      if (!args[0] || !args[1]) {
        msg.channel.send(
          `Correct Syntax: \`\`${botprefix}addrole @user rolename\`\``
        );
      }
      const user = msg.mentions.users.first();
      if (user) {
        let member = msg.guild.member(user);
        if (member) {
          let role = msg.guild.roles.find(role => role.name === args[1]);
          if (role) {
            member.addRole(role);
          } else {
            msg.channel.send("Couldn't find Role: " + args[1]);
          }
        }
      }
    }

    if (command === "poll" || command === "vote") {
      let embed = new discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTitle("Poll")
        .setDescription(args.join(" "))
        .setFooter(`Poll by ${msg.author.tag}`);
      msg.channel.send(embed).then(message => {
        message
          .react("✅")
          .then(() => message.react("❎").then(() => message.react("❓")));
      });
    }
    if (command === "help" || command === "info") {
      let embed = new discord.RichEmbed();
      embed
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTitle("Help")
        .setDescription(
          `Made By Shreyansh Mishra\nCommands:\n1. ${botprefix}add num1 num2 : adds two numbers\n2. ${botprefix}createrole ROLENAME COLOR : Creates a new role with specified color\n3. ${botprefix}addrole @user ROLENAME : assigns a given role to the user\n4. ${botprefix}poll/vote QUESTION : Creates a poll with yes or no as options\n5. ${botprefix}help : shows this message `
        );

      msg.channel.send(embed);
    }
  }
});

bot.on("guildMemberAdd", member => {
  let chan = member.guild.channels.find(ch => ch.name === "welcome");
  if (!chan) {
    return;
  }
  chan.send(`***__Welcome to the Friend Circle, ${member}!__***`);
});

// Since there is no actual preview for the bot (unless you add your own website code)
// It will be an error or continious refresh loop, consider this part of the code that keeps the bot alive
// Though you will still need an uptime robot in order to truely keep the bot alive
// This is NOT my code, the code is directly from this page: https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/other-guides/hosting-on-glitchcom.html
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

bot.login(token);
