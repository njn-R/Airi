var apiaiApp = require('apiai')("f5f50d38b1974c54be0a71328d8920e4");
const fs = require('fs');
const Discord = require('discord.js');
var request = require('request');


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

	if(command === "feed")
		bot.commands.get(command).execute(message, args);
	else
	{
		var term = encodeURI(command)

		// make a request to giphy with the search term
		// we can also set the raiting 
		request('http://api.giphy.com/v1/gifs/search?q=' + term + '&rating=r&api_key=dc6zaTOxFJmzC', function (error, response, body) {
		  if (!error && response.statusCode == 200) {

		  	content =  JSON.parse(body)

		  	// giphy returns several results so we can grab a random result by generating a random index
		  	// random number between 0 and 10
		  	item = Math.floor(Math.random() * 10)

		  	// reply to the channel by sending a message (image url)
		    bot.sendMessage({
	            to: channelID,
	            message: content.data[item].images.fixed_height.url
	        });
		  }
		})
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

