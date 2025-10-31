const {
  MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration, handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {

    let settings = client.settings.get(message.guild.id);
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language");

    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = [handlemsg(client.la[ls].cmds.info.help.error1)]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable1"]))
            .setDescription(items.join("︲"))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom), client.user.displayAvatarURL());

          message.reply({embeds: [embed]})
          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.reply({embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, {command: args[0].toLowerCase()}))]});
        } else if (cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable2"]))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom, {prefix: prefix}), client.user.displayAvatarURL());
          let embeds = allotherembeds_eachcategory();
          if(cat == "🔰 Info")
            return message.reply({embeds: [embeds[0]]})
          if(cat == "💸 Economy")
            return message.reply({embeds: [embeds[1]]})
          if(cat == "🏫 School Commands")
            return message.reply({embeds: [embeds[2]]})
          if(cat == "🎶 Music")
            return message.reply({embeds: [embeds[3]]})
          if(cat == "👀 Filter")
            return message.reply({embeds: [embeds[4]]})
          if(cat == "⚜️ Custom Queue(s)")
            return message.reply({embeds: [embeds[5]]})
          if(cat == "🚫 Administration")
            return message.reply({embeds: [embeds[6]]})
          if(cat == "💪 Setup")
            return message.reply({embeds: [embeds[7]]})
          if(cat == "⚙️ Settings")
            return message.reply({embeds: [embeds[8]]})
          if(cat == "👑 Owner")
            return message.reply({embeds: [embeds[9]]})
          if(cat == "⌨️ Programming")
            return message.reply({embeds: [embeds[10]]})
          if(cat == "📈 Ranking")
            return message.reply({embeds: [embeds[11]]})
          if(cat == "🔊 Soundboard")
            return message.reply({embeds: [embeds[12]]})
          if(cat == "🎤 Voice")
            return message.reply({embeds: [embeds[13]]})
          if(cat == "🕹️ Fun")
            return message.reply({embeds: [embeds[14]]})
          if(cat == "🎮 MiniGames")
            return message.reply({embeds: [embeds[15]]})
          if(cat == "😳 Anime-Emotions")
            return message.reply({embeds: [embeds[16]]})
          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable3"]));
            } catch {}
          } else {
            embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable4"]))
          }
          return message.reply({embeds: [embed]})
        }
        if (cmd.name) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.name), `\`\`\`${cmd.name}\`\`\``);
        if (cmd.name) embed.setTitle(handlemsg(client.la[ls].cmds.info.help.detail.about, {cmdname: cmd.name}));
        if (cmd.description) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.desc), `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases && cmd.aliases.length > 0 && cmd.aliases[0].length > 1) try {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.aliases), `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch { }
        if (cmd.cooldown) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.usage), `\`\`\`${prefix}${cmd.usage}\`\`\``);
          embed.setFooter(handlemsg(client.la[ls].cmds.info.help.detail.syntax), es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL());
        }
        return message.reply({embeds: [embed]});
      } else {
        let button_back = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji("<a:Back:1156125520711397396>").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
        let button_home = new MessageButton().setStyle('PRIMARY').setCustomId('2').setEmoji("<a:Home:1156125978217685063>").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
        let button_forward = new MessageButton().setStyle('PRIMARY').setCustomId('3').setEmoji('<a:Forward:1156125102811914270>').setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))        
        let button_tutorial = new MessageButton().setStyle('LINK').setEmoji("<:Support:1158001418083500052> ").setLabel("Support Server").setURL("https://discord.gg/a7r25Cz2UD")
        let menuOptions = [
          {
            label: "Overview",
            value: "Overview",
            emoji: "1156125978217685063",
            description: "My Overview of me!"
          },
          {
            label: "Information",
            value: "Information",
            emoji: "1248945038675808338",
            description: "Commands to share Information"
          },
          {
            label: "Economy",
            value: "Economy",
            emoji: "1248941201168535573",
            description: "Commands to use the Economy System"
          },
          {
            label: "School",
            value: "School",
            emoji: "🏫",
            description: "Commands useful for School and work!"
          },
          {
            label: "Music",
            value: "Music",
            emoji: "1157589838296514573",
            description: "Commands to play Music / add Filter"
          },
          {
            label: "Filter",
            value: "Filter",
            emoji: "1157587956148752475",
            description: "Commands to add Filters to the Music"
          },
          {
            label: "Customqueue",
            value: "Customqueue",
            emoji: "1157587956148752475",
            description: "Commands to Save Queues and Manage them"
          },
          {
            label: "Admin",
            value: "Admin",
            emoji: "1248941963089281094",
            description: "Commands to Administrate the Server"
          },
          {
            label: "Setup",
            value: "Setup",
            emoji: "1170262559253868555",
            description: "Commands to Setup Systems"
          },
          {
            label: "Settings",
            value: "Settings",
            emoji: "1170262559253868555",
            description: "Commands to change Server Settings"
          },
          {
            label: "Owner",
            value: "Owner",
            emoji: "1259420706467483658",
            description: "Commands to to manage the Bot"
          },
          {
            label: "Programming",
            value: "Programming",
            emoji: "1259421116120961046",
            description: "Commands useful for Programming"
          },
          {
            label: "Ranking",
            value: "Ranking",
            emoji: "📈",
            description: "Commands to mange and show Ranks"
          },
          {
            label: "Soundboard",
            value: "Soundboard",
            emoji: "1157587956148752475",
            description: "Commands for Voice Soundboard"
          },
          {
            label: "Voice",
            value: "Voice",
            emoji: "1157587956148752475",
            description: "Commands for Voice Channels Management"
          },
          {
            label: "Fun",
            value: "Fun",
            emoji: "1170261449524924446",
            description: "Commands for Fun (Image) uses"
          },
          {
            label: "Minigames",
            value: "Minigames",
            emoji: "1170261449524924446",
            description: "Commands for Minigames with the Bot"
          },
          {
            label: "Anime-Emotions",
            value: "Anime-Emotions",
            emoji: "1156133830072221786",
            description: "Commands to show your Emotions with Anime style"
          },
          {
            label: "Customcommand",
            value: "Customcommand",
            emoji: "1170262559253868555",
            description: "Custom Commands of this Server"
          },
        ];
        menuOptions = menuOptions.map(i=>{
          if(settings[`${i?.value.toUpperCase()}`] === undefined){
            return i; //if its not in the db, then add it
          }
          else if(settings[`${i?.value.toUpperCase()}`]){
            return i; //If its enabled then add it
          }
          else if(settings.showdisabled && settings[`${i?.value.toUpperCase()}`] === false){
            return i;
          } else {
            //return i // do not return, cause its disabled! to be shown
          }
        })
        let menuSelection = new MessageSelectMenu()
          .setCustomId("MenuSelection")
          .setPlaceholder("Click me to view Help-Menu-Category-Page(s)")
          .setMinValues(1)
          .setMaxValues(5)
        .addOptions(menuOptions.filter(Boolean))
        let buttonRow = new MessageActionRow().addComponents([button_back,button_home, button_forward, button_tutorial])
        let SelectionRow = new MessageActionRow().addComponents([menuSelection])
        const allbuttons = [buttonRow, SelectionRow]
        //define default embed
        let OverviewEmbed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter("Page Overview\n"+ client.user.username, client.user.displayAvatarURL())
                .setTitle(`Information about __${client.user.username}__`)
        .addField("<a:Features:1430843377439740014> **__My Features__**",
        `>>> **58+ Systems**, including:
        <:Twitter:1430843357885628516> **Twitter Auto-Poster**
        <:YouTube:1430843360998064259> **YouTube Auto-Poster**
        <:Ticket:1430843371156672593> **Ticket System**
       <:joined:1430843383663951892>**Welcome Images**
        <:Reaction_role:1430843374386020414> **Reaction Role System**
        <:system:1430843380874743819> **Systems Like**
      <a:Music:1430843386713210911> Advanced <a:spotify:1430843363707326504> **Music System** with **Audio Filtering**
        <a:Games:1430843402064232448> **150+ Mini-games** and **Fun Commands**
        <a:Admin:1430843397412880455> **Administration** and **Auto-Moderation** features
        ...and much more!`)
     
       .addField("<a:How:1430843390085304431> **__How do you use me?__**",
        `>>> Use \`${prefix}setup\` and select what you want for your server in the given modules.
        You can also use \`${prefix}setup-music\` and \`${prefix}setup-welcome\``)

        .addField("How to get help?", `>>> **\` 1. Way \`** *Use the Buttons, to swap the Pages*\n**\` 2. Way \`** *Use the Menu to select all Help Pages, you want to display*`)
        

                //Send message with buttons
        let helpmsg = await message.reply({ 
            content: `***Click on the __Buttons__ to swap the Help-Pages***`,
            embeds: [OverviewEmbed], 
            components: allbuttons
        }).catch(e=>{
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => {})
        });
        var edited = false;
        var embeds = [OverviewEmbed]
        for(const e of allotherembeds_eachcategory(true))
          embeds.push(e)        
        let currentPage = 0;

        //create a collector for the thinggy
        const collector = helpmsg.createMessageComponentCollector({filter: (i) => (i?.isButton() || i?.isSelectMenu()) && i?.user && i?.message.author.id == client.user.id, time: 180e3 });
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        collector.on('collect', async b => {
          try{
            if(b?.isButton()){
            if(b?.user.id !== message.author.id)
              return b?.reply({content: handlemsg(client.la[ls].cmds.info.help.buttonerror, {prefix: prefix}), ephemeral: true});

              //page forward
              if(b?.customId == "1") {
                //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage !== 0) {
                    currentPage -= 1
                  } else {
                      currentPage = embeds.length - 1
                  }
              }
              //go home
              else if(b?.customId == "2"){
                //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                  currentPage = 0;
              } 
              //go forward
              else if(b?.customId == "3"){
                //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                  } else {
                      currentPage = 0
                  }
              }
              await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons}).catch(e=>{})
              b?.deferUpdate().catch(e=>{})


            }
            if(b?.isSelectMenu()){
              //b?.reply(`***Going to the ${b?.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
              let vembeds = []
              let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
              for(const value of b?.values){
                switch (value.toLowerCase()){
                  case "overview": index = 0; break;
                  case "information": index = 1; break;
                  case "economy": index = 2; break;
                  case "school": index = 3; break;
                  case "music": index = 4; break;
                  case "filter": index = 5; break;
                  case "customqueue": index = 6; break;
                  case "admin": index = 7; break;
                  case "setup": index = 8; break;
                  case "settings": index = 9; break;
                  case "owner": index = 10; break;
                  case "programming": index = 11; break;
                  case "ranking": index = 12; break;
                  case "soundboard": index = 13; break;
                  case "voice": index = 14; break;
                  case "fun": index = 15; break;
                  case "minigames": index = 16; break;
                  case "anime-emotions": index = 17; break;
                  case "nsfw": index = 18; break;
                  case "customcommand": index = 19; break;
                }
                vembeds.push(theembeds[index])
              }
              b?.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          }catch (e){
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            console.log(String(e).italic.italic.grey.dim)
          }
        });

        collector.on('end', collected => {
          //array of all disabled buttons
          let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true),button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
          const alldisabledbuttons = [d_buttonRow]
          if(!edited){
            edited = true;
            helpmsg.edit({content: handlemsg(client.la[ls].cmds.info.help.timeended, {prefix: prefix}), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons}).catch((e)=>{})
          }
        });
        }        
        function allotherembeds_eachcategory(filterdisabled = false){
          //ARRAY OF EMBEDS
          var embeds = [];

          //INFORMATION COMMANDS
          var embed0 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "<a:Bot_Info:1430843404539007006> Info").size}\`] <a:Bot_Info:1430843404539007006> Information Commands <a:Bot_Info:1430843404539007006>`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(`<:a_member:1430843457823576135> **User Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "user").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField(`<a:Games:1430843402064232448> **Games Related Commands**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "games").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField(`<:discord:1430843503432306721> **Server Related Commands**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField(`<:Type_Bot:1430843409983213629> **Bot Related Commands**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField(`<:Builder:1430843501112856697> **Util Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "util").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
          embeds.push(embed0)

          //ECONOMY COMMANDS
          var embed1 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💸 Economy").size}\`] <a:Economy:1430843407047327835> Economy Commands <a:Economy:1430843407047327835> | ${settings.ECONOMY ? " <:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💸 Economy").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(`<a:Games:1430843402064232448> **Mini Game to earn money**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "game").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField(`<:autoplay:1430843436449271950> **Repeatingly earn 💸 via Event(s)**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "earn").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField(`<a:Economy:1430843407047327835> **Information & Manage **`,  ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "info").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            if(!filterdisabled || settings.ECONOMY || settings.showdisabled) embeds.push(embed1)

          //SCHOOL COMMANDS
          var embed2 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").size}\`] <a:Home:1430843355310329886> School Commands <a:Home:1430843355310329886> | ${settings.SCHOOL ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(`<:lyrics:1430843496293728386> **Mathematics**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🏫 School Commands" && cmd.type === "math").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField(`<:autoplay:1430843436449271950> **Time Management**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🏫 School Commands" && cmd.type === "time").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
          if(!filterdisabled || settings.SCHOOL || settings.showdisabled) embeds.push(embed2)

          //MUSIC COMMANDS type: song, queue, queuesong, bot
          var embed3 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎶 Music").size}\`] <a:Music:1430843386713210911> Music Commands <a:Music:1430843386713210911> | ${settings.MUSIC ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎶 Music").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(" <:music_queue:1430843430346424421> **Queue Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("queue")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:music_pause:1430843433076916245> **Song Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("song")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:Type_Bot:1430843409983213629> **Bot Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("bot")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            if(!filterdisabled || settings.MUSIC || settings.showdisabled) embeds.push(embed3)

          //FILTER COMMANDS
          var embed4 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👀 Filter").size}\`] <:music_queue:1430843430346424421> Filter Commands <:music_queue:1430843430346424421> | ${settings.FILTER ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👀 Filter").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
          if(!filterdisabled || settings.FILTER || settings.showdisabled) embeds.push(embed4)

          //CUSTOM QUEUE COMMANDS
          var embed5 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().extracustomdesc.length}\`] <:lyrics:1430843496293728386> Custom Queue(s) Commands <:lyrics:1430843496293728386> | ${settings.CUSTOMQUEUE ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().extracustomdesc.split(",").map(i => i?.trim()).join(",  ")}*`)
            .addField("\u200b", "\u200b")
            .addField("<:lyrics:1430843496293728386> **Usage**", "> "+client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().usage)
          if(!filterdisabled || settings.CUSTOMQUEUE || settings.showdisabled) embeds.push(embed5)

          //ADMINISTRATION
          var embed6 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🚫 Administration").size}\`]  <a:Admin:1430843397412880455> Admin Commands <a:Admin:1430843397412880455>`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🚫 Administration").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:discord:1430843503432306721> **Server Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("server")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:discord:1430843503432306721> **Channel Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("channel")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:discord:1430843503432306721> **Thread Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("thread")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:discord:1430843503432306721> **Role Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("role")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:discord:1430843503432306721> **Member Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("member")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
          embeds.push(embed6)

          //SETUP
          var embed7 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💪 Setup").size}\`] <:Builder:1430843501112856697>  Setup Commands <:Builder:1430843501112856697> `)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💪 Setup").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:Builder:1430843501112856697> **Setups for Entertainment**", "> "+client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("fun")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<a:How:1430843390085304431> **Information & Manage (Bot/Server) Settings**", "> "+client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("info")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:system:1430843380874743819> **Most used Systems**", "> "+client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("system")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<<:Builder:1430843501112856697> **Security Systems**", "> "+client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("security")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
          embeds.push(embed7)

          //Settings
          var embed8 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").size}\`] <:Builder:1430843501112856697> Settings Commands <:Builder:1430843501112856697>`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:Builder:1430843501112856697> **User Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("user")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:Builder:1430843501112856697> **Bot Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("bot")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:Builder:1430843501112856697> **Music Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("music")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
          embeds.push(embed8)

          //Owner
          var embed9 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👑 Owner").size}\`] <a:Owner:1433374901510869133> Owner Commands <a:Owner:1433374901510869133>`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👑 Owner").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",   ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(" <:discord:1430843503432306721> **Information & Manage**", "> "+client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type.includes("info")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:Type_Bot:1430843409983213629> **Adjust the Bot**", "> "+client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type.includes("bot")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            embeds.push(embed9)

          //Programming Commands
          var embed10 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").size}\`] <a:Valid_Code_Developer:1430843413074284545> Programming Commands <a:Valid_Code_Developer:1430843413074284545> | ${settings.PROGRAMMING ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
          if(!filterdisabled || settings.PROGRAMMING || settings.showdisabled) embeds.push(embed10)

          //Ranking
          var embed11 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "📈 Ranking").size}\`] <a:network:1430843498646470756> Ranking Commands <a:network:1430843498646470756> | ${settings.RANKING ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "📈 Ranking").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:Builder:1430843501112856697> **Manage Rank**", `> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking" && cmd.type === "manage").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}`)
            .addField("<a:network:1430843498646470756> **Rank Information**", `> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking" && cmd.type === "info").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}`)
          if(!filterdisabled || settings.RANKING || settings.showdisabled) embeds.push(embed11)

          //SOUNDBOARD COMMANDS
          var embed12 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").size}\`] <a:MusicDisk:1430843506288492584> Soundboard Commands <a:MusicDisk:1430843506288492584> | ${settings.SOUNDBOARD ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)

            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)

          if(!filterdisabled || settings.SOUNDBOARD || settings.showdisabled) embeds.push(embed12)

          //Voice COMMANDS
          var embed13 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.length}\`] <:music_skip:1430843475506499676>
 Voice Commands<:music_skip:1430843475506499676>| ${settings.VOICE ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.split(",").map(i => i?.trim()).join(",  ")}*`)
            .addField("\u200b", "\u200b")
            .addField("<:music_skip:1430843475506499676>  **Usage**", "> "+client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().usage)
          if(!filterdisabled || settings.VOICE || settings.showdisabled) embeds.push(embed13)

          //FUN COMMANDS
          var embed14 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").size}\`] <a:jozkojam:1430843513242914880> Fun Commands <a:jozkojam:1430843513242914880> | ${settings.FUN ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<a:jozkojam:1430843513242914880> **Fun User Image Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "user").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<a:jozkojam:1430843513242914880> **Fun User Image-Text Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "usertext").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<a:jozkojam:1430843513242914880> **Fun Text Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "text").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
          if(!filterdisabled || settings.FUN || settings.showdisabled) embeds.push(embed14)

          //MINIGAMES
          var embed15 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").size}\`] <a:Games:1430843402064232448> Mini Games Commands <a:Games:1430843402064232448> | ${settings.MINIGAMES ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<a:Games:1430843402064232448> **Text Based Minigames**", "> "+client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "text").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:music_stop:1430843422318661732>**Button(s) Minigames**", "> "+client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "buttons").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .addField("<:Join:1430843472428007594> **Voice Minigames**", "> "+client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "voice").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  "))
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
          if(!filterdisabled || settings.MINIGAMES || settings.showdisabled) embeds.push(embed15)

          //ANIME EMOTIONS
          var embed16 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions").size}\`] <:a_member:1430843457823576135> Anime Commands <:a_member:1430843457823576135> | ${settings.ANIME ? "<:yes:1431196867844374569> ENABLED" : "<:no:1431196812349542440> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:a_member:1430843457823576135> **Anime-Mention-Emotions (or Self.)**", `> ${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions" && cmd.type === "mention").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}`)
            .addField("<:a_member:1430843457823576135> **Anime-Self-Emotions**", `> ${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions" && cmd.type === "self").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join(",  ")}`)
          if(!filterdisabled || settings.ANIME || settings.showdisabled) embeds.push(embed16)

          //CUSTOM COMMANDS EMBED
          var embed18 = new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable23"]))
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc
          embed18.setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable24"]))
          embed18.setDescription(">>> " + items.join(",  "))
          embeds.push(embed18)

          return embeds.map((embed, index) => {
            return embed
            .setColor(es.color)
            .setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setFooter(client.getFooter(`Page ${index + 1} / ${embeds.length}\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL()));
          })
        }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}
