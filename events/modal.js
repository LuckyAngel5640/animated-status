module.exports = {
	name: "interactionCreate",
	once: false,
	async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'add') {
            const name = interaction.fields.getTextInputValue('name');
            const token = interaction.fields.getTextInputValue('token');
            const id = interaction.fields.getTextInputValue('id');
            const webhook = interaction.fields.getTextInputValue('webhook');
            const names = await interaction.client.db.get(`names`)
            if (names) {
              if (names.includes(name)) return interaction.reply({content: '<:fail:1089073675808018502> | **Bruh this name is aleardy taken!**', ephemeral: true})
            }
            await interaction.client.db.push(`names`, name)
            await interaction.client.db.set(`${name}.token`, token)
            await interaction.client.db.set(`${name}.id`, id)
            await interaction.client.db.set(`${name}.webhook`, webhook)
                try {
                const self = require("discord.js-selfbot-v13")
                const client = new self.Client()
                const web = new self.WebhookClient({ url: webhook });
                client.on("messageCreate", async (message) => {
                  const Prefix = name+"!"
                    const Attachment = message.attachments;
                    const args = message.content.slice(Prefix.length).trim().split(/ +/g);
                    const command = args.shift().toLowerCase()

                    if(command === "destroy") {
                      if(client.user.id !== message.author.id)
                      client.destroy()
                    }
                    if(message.channel.id !== id) return;
                     
                    
                  
                    web.send({
                      content: message.content || "***NO CONTENT*** | Sticker or something else",
                      username: message.author.tag,
                      embeds: message.embeds,
                      avatarURL: "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg",
                      
                  });
                  
                  setTimeout(function() {
                  Attachment.forEach(function(attachment) {
                    web.send({
                      content: attachment.url,
                      username: message.author.tag,
                      avatarURL: "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg",
                  });
                  });
                    }, 500);
                  })
                  
            client.login(token)
            client.on("ready", async () =>{
                await interaction.followUp({content : '<:success:1089073672062517298> | **your client is now ready**', ephemeral: true})
            })
                } catch(er) {
                    console.log(er)
                }
            
                        await interaction.reply({ content: '<:success:1089073672062517298> | **your client has been added to our service**', ephemeral: true});
        }
    
	},
};
