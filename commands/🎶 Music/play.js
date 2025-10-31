const Discord = require(`discord.js`);
const { MessageEmbed} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);
  
module.exports = {
  name: "play",
  category: "🎶 Music",
  aliases: ["p"],
  description: "Plays a song from YouTube",
  usage: "play <Song / URL>",
  parameters: { type: "music", activeplayer: false, previoussong: false },
  type: "queuesong",

  run: async (client, message, args, cmduser, text, prefix, player) => {
    const es = client.settings.get(message.guild.id, "embed") || ee;
    const ls = client.settings.get(message.guild.id, "language") || "en";

    if (!client.settings.get(message.guild.id, "MUSIC")) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter({ text: es.footertext, iconURL: es.footericon })
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(handlemsg(client.la[ls].common.disabled.description, { prefix }))
        ]
      });
    }

    try {
      if (!args[0])
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(client.la[ls].cmds.music.play.variable1)
          ]
        });

      // Réactions pour indiquer la recherche
      try { message.react("🔎"); } catch {}
      try { message.react("840260133686870036"); } catch {}

      // Appel du playermanager
      playermanager(client, message, args, "song:youtube");
    } catch (e) {
      console.log(e.stack || e);
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(client.la[ls].common.erroroccur)
            .setDescription(client.la[ls].cmds.music.play.variable2)
        ]
      });
    }
  }
};