var apiaiApp = require('apiai')("f5f50d38b1974c54be0a71328d8920e4");
const fs = require('fs');
const Discord = require('discord.js');
//const {prefix, token}= require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}


bot.once('ready', () =>
{
	console.log(bot.user.username + " is online!");
	bot.user.setActivity("Phantasy Star Online 2", {type: "PLAYING"});

});

bot.on('message', async message => {

	//AI Chat
	
	// try{

	// 	if ((message.channel.id == "591605442661318667" || message.channel.id =="649639369061171200" || message.channel.id == "580654853454561290") && !message.author.bot) {
	// 		// Get a substring to exclude the ! from the message
	// 		var text = message.content;
			
	// 		// Parse the text to the API.ai
	// 		var request = apiaiApp.textRequest(text, {
	// 			sessionId: 'uwu'
	// 		});

	// 		// Listen to a response from API.ai
	// 		request.on('response', (response) => {
	// 			// Reply the user with the given response
	// 			message.channel.send(response.result.fulfillment.speech);
	// 		});
		
	// 		// Listen for any errors in the response
	// 		request.on('error', (error) => {
	// 			// Tell the user that an error happened
	// 			message.channel.send("The hamsters in my server ran away D:")
	// 		});

	// 		// End the request to avoid wasting memory
	// 		request.end();
	// 	}
	// }
	// catch(error) 
	// {
	// 	console.error(error);
	// 	message.reply('There was an error trying to execute that command!');
	// }

	if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;
	//if (!message.content.startsWith(prefix) || message.author.bot) return;
	else if(message.channel.id == "591605442661318667" || message.channel.id =="649639369061171200" || message.channel.id == "580654853454561290")
	{
			const args = message.content.slice(process.env.prefix.length).split(/ +/);
			//const args = message.content.slice(prefix.length).split(/ +/);
			
			var command = args.shift().toLowerCase();

			if (!bot.commands.has(command)) return;

			try 
			{
				if(command === "create")
				{
					await bot.commands.get(command).execute(message, args);
					command = "details";
					bot.commands.get(command).execute(message, args);
				}
				else
				{
					bot.commands.get(command).execute(message, args);
				}

			}
			catch (error) 
			{
				console.error(error);
				message.reply('There was an error trying to execute that command!');
			}
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
//bot.login(token);
