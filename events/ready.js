
module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const selfs = await client.db.get(`names`)
		if (selfs) {
			for (const name of selfs) {
				const token = await client.db.get(`${name}.token`)
				const id = await client.db.get(`${name}.id`)
				const webhook = await client.db.get(`${name}.webhook`)
				try {
					const self = require("discord.js-selfbot-v13")
					const client = new self.Client()
					const web = new self.WebhookClient({ url: webhook });
					client.on("messageCreate", async (message) => {
						if(message.channel.id !== id) return;
						const Attachment = message.attachments;
						  
						
						 
						
					  
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

					} catch(er) {
						console.log(er)
					}
			}
		}
		
	},
};
