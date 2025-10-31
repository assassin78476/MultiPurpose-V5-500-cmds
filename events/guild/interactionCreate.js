// interactionCreate.js
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const settings = require(`${process.cwd()}/botconfig/settings.json`);
const {
  onCoolDown,
  escapeRegex,
  delay,
  simple_databasing,
  databasing,
  handlemsg,
  check_if_dj
} = require(`${process.cwd()}/handlers/functions`);
const Discord = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction?.isCommand()) return;

  const { member, guildId, commandName, options, channelId } = interaction;
  const guild = member?.guild;
  if (!guild)
    return interaction?.reply({ content: ":x: Interactions only work in GUILDS!", ephemeral: true }).catch(() => {});

  simple_databasing(client, guild.id, member.id);

  const guild_settings = client.settings.get(guild.id);
  const es = guild_settings.embed;
  const ls = guild_settings.language;
  const { prefix, botchannel } = guild_settings;

  let command;
  try {
    // Try subcommand first
    command = client.slashCommands.get(commandName + options.getSubcommand());
  } catch {
    // Fallback to normal command
    command = client.slashCommands.get("normal" + commandName);
  }

  if (!command) return;

  // Check botchannel restrictions
  if (!command.category?.toLowerCase().includes("nsfw") && Array.isArray(botchannel) && botchannel.length > 0) {
    if (!botchannel.includes(channelId) && !member.permissions.has("ADMINISTRATOR")) {
      botchannel.forEach(cid => {
        if (!guild.channels.cache.has(cid)) client.settings.remove(guild.id, cid, `botchannel`);
      });
      return interaction?.reply({
        ephemeral: true,
        embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter({ text: es.footertext, iconURL: es.footericon })
          .setTitle(client.la[ls].common.botchat.title)
          .setDescription(`${client.la[ls].common.botchat.description}\n> ${botchannel.map(c => `<#${c}>`).join(", ")}`)]
      });
    }
  }

  // Cooldown handling
  if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Discord.Collection());
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;
  if (timestamps.has(member.id)) {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return interaction?.reply({
        ephemeral: true,
        embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(handlemsg(client.la[ls].common.cooldown, { time: timeLeft.toFixed(1), commandname: command.name }))]
      });
    }
  }
  timestamps.set(member.id, now);
  setTimeout(() => timestamps.delete(member.id), cooldownAmount);

  // Member permissions check
  if (command.memberpermissions && command.memberpermissions.length > 0 && !member.permissions.has(command.memberpermissions)) {
    return interaction?.reply({
      ephemeral: true,
      embeds: [new Discord.MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter({ text: es.footertext, iconURL: es.footericon })
        .setTitle(client.la[ls].common.permissions.title)
        .setDescription(`${client.la[ls].common.permissions.description}\n> \`${command.memberpermissions.join("`, `")}\``)]
    });
  }

  // Safe player access
  const player = client.manager?.players?.get(guild.id) || null;
  if (player && player.node && !player.node.connected) player.node.connect();

  const mechannel = guild.me?.voice?.channel;
  const userchannel = member.voice?.channel;

  // Music command specific checks
  if (command.parameters?.type === "music") {
    if (!userchannel) {
      return interaction?.reply({
        ephemeral: true,
        embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter({ text: es.footertext, iconURL: es.footericon })
          .setTitle(client.la[ls].common.join_vc)]
      });
    }

    if (!player && mechannel) {
      await guild.me.voice.disconnect().catch(() => {});
      await delay(350);
    }

    if (player && player.queue?.current && command.parameters.check_dj) {
      const djRoles = check_if_dj(client, member, player.queue.current);
      if (djRoles) {
        return interaction?.reply({
          ephemeral: true,
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle("❌ You are not a DJ or Song Requester!")
            .setDescription(`DJ Roles:\n${djRoles}`)]
        });
      }
    }

    if (command.parameters.activeplayer && !player) {
      return interaction?.reply({
        ephemeral: true,
        embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter({ text: es.footertext, iconURL: es.footericon })
          .setTitle(client.la[ls].common.nothing_playing)]
      });
    }

    if (command.parameters.previoussong && (!player?.queue?.previous)) {
      return interaction?.reply({
        ephemeral: true,
        embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter({ text: es.footertext, iconURL: es.footericon })
          .setTitle(client.la[ls].common.nothing_playing)]
      });
    }

    if (player && userchannel?.id !== player.voiceChannel && !command.parameters.notsamechannel) {
      return interaction?.reply({
        ephemeral: true,
        embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter({ text: es.footertext, iconURL: es.footericon })
          .setTitle(client.la[ls].common.wrong_vc)
          .setDescription(`Channel: <#${player.voiceChannel}>`)]
      });
    }

    if (player && mechannel && userchannel.id !== mechannel.id && !command.parameters.notsamechannel) {
      return interaction?.reply({
        ephemeral: true,
        embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter({ text: es.footertext, iconURL: es.footericon })
          .setTitle(client.la[ls].common.wrong_vc)
          .setDescription(`Channel: <#${player.voiceChannel}>`)]
      });
    }
  }

  // Execute command
  const fakeMessage = {
    applicationId: interaction.applicationId,
    author: member.user,
    channel: guild.channels.cache.get(interaction.channelId),
    member: member,
    guild: guild,
    guildId: guild.id,
    channelId: interaction.channelId,
    client: client,
    createdTimestamp: interaction.createdTimestamp,
    embeds: [],
    attachments: [],
    content: null,
    components: [],
    id: null
  };

  try {
    await command.run(client, interaction, member.user, es, ls, prefix, player, fakeMessage);
  } catch (e) {
    console.error(e);
    return interaction?.reply({
      ephemeral: true,
      content: "❌ An error occurred while running this command."
    });
  }
};
