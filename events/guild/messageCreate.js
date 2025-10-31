/**
 * @INFO
 * Loading all needed File Information Parameters
 */
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const {
  escapeRegex,
  delay,
  simple_databasing,
  databasing,
  handlemsg,
  check_if_dj
} = require(`${process.cwd()}/handlers/functions`);

//here the event starts
module.exports = async (client, message) => {
  try {
    if(message.guildId) simple_databasing(client, message.guildId, message.author.id);

    if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return;
    if (message.channel?.partial) await message.channel.fetch().catch(() => {});
    if (message.member?.partial) await message.member.fetch().catch(() => {});

    simple_databasing(client, message.guild.id, message.author.id);

    var not_allowed = false;
    const guild_settings = client.settings.get(message.guild.id);
    let es = guild_settings.embed;
    let ls = guild_settings.language;
    let { prefix, botchannel, unkowncmdmessage } = guild_settings;

    if (message.author.bot) return;
    if (prefix === null) prefix = config.prefix;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);

    // CHECK PERMISSIONS
    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
      return message.reply(`:x: **I am missing the Permission to USE EXTERNAL EMOJIS**`).catch(()=>{});
    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
      return message.reply(`<:no:1249307494656901133> **I am missing the Permission to EMBED LINKS (Sending Embeds)**`).catch(()=>{});
    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
      return message.reply(`<:no:1249307494656901133> **I am missing the Permission to ADD REACTIONS**`).catch(()=>{});

    // CHECK BOT CHANNEL
    if (botchannel.toString() !== "") {
      if (!botchannel.includes(message.channel.id) && !message.member.permissions.has("ADMINISTRATOR")) {
        for(const channelId of botchannel){
          let channel = message.guild.channels.cache.get(channelId);
          if(!channel){
            client.settings.remove(message.guild.id, channelId, `botchannel`)
          }
        }
        try { message.react("833101993668771842").catch(()=>{}) } catch {}
        not_allowed = true;
        return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(client.la[ls].common.botchat.title)
          .setDescription(`${client.la[ls].common.botchat.description}\n> ${botchannel.map(c=>`<#${c}>`).join(", ")}`)]})
          .then(async msg => { setTimeout(()=>{ try { msg.delete().catch(()=>{}) } catch {} }, 5000) })
          .catch(()=>{});
      }
    }

    // Create arguments
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift()?.toLowerCase();
    if (!cmd || cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.color)
          .setTitle(handlemsg(client.la[ls].common.ping, {prefix: prefix}))]})
          .catch(()=>{});
      return;
    }

    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    var customcmd = false;
    var cuc = client.customcommands.get(message.guild.id, "commands") || [];
    for (const c of cuc) {
      if (c.name.toLowerCase() === message.content.slice(prefix.length).split(" ")[0]) {
        customcmd = true;
        if (c.embed) {
          return message.reply({embeds: [new MessageEmbed()
            .setColor(es.color)
            .setThumbnail(es.thumb ? (es.footericon?.startsWith("http") ? es.footericon : client.user.displayAvatarURL()) : null)
            .setFooter(client.getFooter(es))
            .setDescription(c.output)]});
        } else {
          return message.reply(c.output);
        }
      }
    }

    // Music player check (Safe)
    const player = client.manager?.players?.get(message.guild.id);

    if(player && player.node && !player.node.connected) player.node.connect();
    if(message.guild.me.voice.channel && player) {
      if(!player.queue) await player.destroy().catch(()=>{});
      await delay(350);
    }

    // Cooldown system
    if (command) {
      if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Discord.Collection());
      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 1) * 1000;

      if (timestamps.has(message.author.id)) {
        let expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          let timeLeft = (expirationTime - now) / 1000;
          if(timeLeft < 1) timeLeft = Math.round(timeLeft);
          if(timeLeft && timeLeft != 0) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(handlemsg(client.la[ls].common.cooldown, {time: timeLeft.toFixed(1), commandname: command.name}))]})
              .catch(()=>{});
          }
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    // Execute command
    if (command && !customcmd) {
      if(command.category === "💪 Setup") databasing(client, message.guild.id, message.author.id);
      command.run(client, message, args, message.member, args.join(" "), prefix, player);
    }

  } catch (e) {
    console.log(e.stack ? String(e.stack).grey : String(e).grey);
    return message.reply({embeds: [new MessageEmbed()
      .setColor("RED")
      .setTitle(":x: An error occurred")
      .setDescription(`\`\`\`${e.message || String(e).substr(0, 2000)}\`\`\``)]})
      .catch(()=>{});
  }
}
