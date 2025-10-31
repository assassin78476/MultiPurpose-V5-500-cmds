const { MessageEmbed } = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { swap_pages2 } = require(`${process.cwd()}/handlers/functions`);

module.exports = {
  name: "sponsor",
  category: "🔰 Info",
  aliases: ["sponsors"],
  description: "Shows the sponsor of this Bot",
  usage: "sponsor",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language");

    try {
      let embed1 = new MessageEmbed()
        .setColor(es.color)
        .setTitle(eval(client.la[ls]["cmds"]["info"]["sponsor"]["variable1"]))
        .setURL("https://endercloud.tech/")
        .setDescription(`
The Sponsor of this Bot is:
**EnderCloud Hosting**

<<a:Arrow:1259399777351897108> EnderCloud Hosting is sponsoring us with top-notch hosting services.
<<a:Arrow:1259399777351897108> Thanks to them, we can provide you with a seamless experience.

**What they offer:**
<<a:Arrow:1259399777351897108> **>>** Discord Bot Hosting
<<a:Arrow:1259399777351897108> **>>** Reliable Servers
<<a:Arrow:1259399777351897108> **>>** Web Hosting
<<a:Arrow:1259399777351897108> **>>** Payment Portal: [Click Here](https://billing.endercloud.tech/)

[**Website**](https://endercloud.tech/)
[**Payment Portal**](https://billing.endercloud.tech/)
[**Discord Server**](https://discord.gg/ZvxjnDrFDP)
`)
        .setImage("https://assets-global.website-files.com/65eaee8033276fa7b781921d/65eaef8d131af029c9cad497_logo.png")
        .setFooter("EnderCloud Hosting", "https://assets-global.website-files.com/65eaee8033276fa7b781921d/65eaef8d131af029c9cad497_logo.png");

      swap_pages2(client, message, [embed1]);
    } catch (e) {
      console.log(String(e.stack).grey.bgRed);
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(client.getFooter(es))
            .setTitle(client.la[ls].common.erroroccur)
            .setDescription(
              eval(client.la[ls]["cmds"]["info"]["color"]["variable2"])
            ),
        ],
      });
    }
  },
};
