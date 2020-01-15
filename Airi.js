var apiaiApp = require('apiai')("f5f50d38b1974c54be0a71328d8920e4");
const fs = require('fs');
const Discord = require('discord.js');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.once('ready', () =>
{
	console.log(bot.user.username + " is online!");
	bot.user.setActivity("Phantasy Star Online 2", {type: "PLAYING"});
});

bot.on('message', async message => 
{
	//AI Chat	
	if ((message.channel.id == "591605442661318667" || message.channel.id =="649639369061171200" || message.channel.id == "580654853454561290") && !message.author.bot) 
	{	
		if (!message.content.startsWith(process.env.prefix))
		{	
			var text = message.content;
			var request = apiaiApp.textRequest(text, {
				sessionId: 'uwu'
			});	
			request.on('response', (response) => 
			{		
					if(!response.result.fulfillment.speech || response.result.fulfillment.speech.length === 0)
						return;
					else
						message.channel.send(response.result.fulfillment.speech);	
			});
			request.on('error', (error) => 
			{
				message.channel.send("The hamsters in my server ran away D:")
			});
			request.end();
		}	
	}
	
	if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;
	
	const args = message.content.slice(process.env.prefix.length).split(/ +/);	
	var command = args.shift().toLowerCase();
	
	if(message.channel.id == "591605442661318667" || message.channel.id =="649639369061171200" || message.channel.id == "580654853454561290")
	{
		if (!bot.commands.has(command)) return;
		bot.commands.get(command).execute(message, args);			
	}
	else if(command === "feed")
		bot.commands.get(command).execute(message, args);	
	else if(command === "fetch")
	{
		if(args[0] === "rock" || args[0] === "rocket" || args[0] === "boss" || args[0] === "verda" || args[o] === "rabbit")
			message.channel.send("https://i.imgur.com/RjBYCmL.gifv");
	}
	else 
	{	
		//var tags = "anime";
		var tags = "";
		tags = tags.concat(command);
		//var tags = args;
		//tags = tags.concat(command);
		const Tenor = require("tenorjs").client({
			"Key": "IBEW4A0KACM3", // https://tenor.com/developer/keyregistration
			"Filter": "low", // "off", "low", "medium", "high", not case sensitive
			"Locale": "en_US", // Your locale here, case-sensitivity depends on input
			"MediaFilter": "minimal", // either minimal or basic, not case sensitive
			"DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
		});
		Tenor.Search.Random(tags, "1").then(Results => {
		//Tenor.Search.Query(tags, "1").then(Results => {
			Results.forEach(Post => {
					message.channel.send(Post.url);
			});
		}).catch(console.error);
	}	
		
});


// var messageID;

// bot.on('raw', event =>
// {
// 	//console.log(event);
// 	const eventName = event.t;
// 	if(eventName === 'MESSAGE_CREATE')
// 	{
// 		if(event.d.author.id === '580638610571657216')
// 		{	
// 			messageID = event.d.id;			
// 		}
// 	}
// 	if(eventName === 'MESSAGE_REACTION_ADD')
// 	{
// 		if(event.d.message_id === messageID)
// 		{
// 			var reactionChannel = event.d.channel_id;
// 			var emojiID = event.d.emoji.id;
// 			try
// 			{
// 				if((reactionChannel === "591605442661318667") && (emojiID === "571963380143751169")) 
// 				{				
// 					var user = bot.users.get(event.d.user_id);
// 					//console.log(user.username)
// 					command = "add";
// 					bot.commands.get(command).execute(user);		
// 				}
// 			}
// 			catch (error) 
// 			{
// 				console.error(error);
// 				message.reply('There was an error trying to execute that command!');
// 			}
// 		}
		
// 	}
// 	if(eventName === 'MESSAGE_REACTION_REMOVE')
// 	{
// 		if(event.d.message_id === messageID)
// 		{
// 			var reactionChannel = event.d.channel_id;
// 			var emojiID = event.d.emoji.id;
// 			try
// 			{
// 				if((reactionChannel === "589023788432228362") && (emojiID === "571963380143751169")) 
// 				{
// 					var user = bot.users.get(event.d.user_id);
// 					//console.log(user.username)
// 					command = "remove";
// 					bot.commands.get(command).execute(user);
// 				}
// 			}
// 			catch (error)
// 			{
// 				console.error(error);
// 				message.reply('There was an error trying to execute that command!');
// 			}
// 		}
		
// 	}
// });

//bot.on('messageReactionAdd', (messageReaction, user) => {
	//console.log(user.username + " reacted");
//});
	
bot.login(process.env.token);

