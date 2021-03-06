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

    var Timer = 1000 * 60 * 60;
    setInterval(function(){ sendMessage();}, Timer)	
	
});

bot.on('message', async message => 
{
	//AI Chat	
	if ((message.channel.id == "685384802387755046" || message.channel.id == "580654853454561290") && !message.author.bot) 
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
	
	if(message.channel.id == "685384802387755046" || message.channel.id == "580654853454561290" || message.channel.id == "704276729996378173")
	{
		if (!bot.commands.has(command)) return;
		bot.commands.get(command).execute(message, args);			
	}
	else if(command === "feed")
		bot.commands.get(command).execute(message, args);	
	
	
	//Gif funtion
	else 
	{	
		if(message.guild.id == "597857533734027274" ) return;
		var letters = /^[A-Za-z]+$/;
	  	if(command.match(letters))
	  	{
			var tags = "anime";
			tags = tags.concat(command);
			const Tenor = require("tenorjs").client({
				"Key": "IBEW4A0KACM3", 
				"Filter": "off", // "off", "low", "medium", "high", not case sensitive
				"Locale": "en_US", 
				"MediaFilter": "minimal", // either minimal or basic, not case sensitive
				"DateFormat": "D/MM/YYYY - H:mm:ss A" 
			});
			Tenor.Search.Random(tags, "1").then(Results => {
				Results.forEach(Post => {
						message.channel.send(Post.url);
				});
			}).catch(console.error);
		}
	}	
		
});


function sendMessage()
{
  	const { google } = require('googleapis');
  	const sheetsApi = google.sheets({version: 'v4'});
  	const googleAuth = require('./auth');

  	const SPREADSHEET_ID = '12R7LeVmuc2B8ZzSmjxl_c7jt0fD-GOghgk92cadS9qo';
  
  	googleAuth.authorize()
      .then((auth) => {
          sheetsApi.spreadsheets.values.get({
              auth: auth,
              spreadsheetId: SPREADSHEET_ID,
              range: "Form Responses 1!A2:Q",
          }, function (err, response) 
             {
                if (err) 
                {
                  console.log('The API returned an error: ' + err);
                  return console.log(err);
                }
				const rows = response.data.values;
                if (rows.length>rows[0][16]) 
                {
					let lastRow = rows.length-1;
	
                    var guild = bot.guilds.cache.get('444170493155606535');
                    if(guild && guild.channels.cache.get('468327502335705088'))
                    {
                        const memberApp = new Discord.MessageEmbed()              
                        .setTitle("New Member Application (Click here)")
                        .setURL('http://tiny.cc/applyResponse')
                        .setColor('#597E8D')     
                        .addField('Player ID Name: '+ '***' + rows[lastRow][1] + '***' , "\u200b")
            
                        guild.channels.cache.get('468327502335705088').send(memberApp);
              
                    }
      
				
					let valueInputOption = "USER_ENTERED";
                    let myValue = (++rows[0][16]);    
                    let values = [[myValue]];
                   
                    let resource = {
                        values,
                    };
			   
					googleAuth.authorize()
					.then((auth) => {		
							sheetsApi.spreadsheets.values.update({
								auth: auth,
								spreadsheetId: SPREADSHEET_ID,
								range: "Form Responses 1!Q2",
                                valueInputOption,
                                resource
							}, function (err, response) 
								{
								if (err) 
								{
									console.log('The API returned an error: ' + err);
									return console.log(err);
								}							
							});								  
						
					
					}).catch((err) => 
					{
						console.log('auth error', err);
				  	});


			   }
			   
          });
      })
      .catch((err) => {
          console.log('auth error', err);
    });
 

}

bot.login(process.env.token);

