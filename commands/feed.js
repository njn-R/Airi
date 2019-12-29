const Discord = require("discord.js");

module.exports =
{
    name: 'feed',
    description: 'Feed someone',
    execute(message, args)
    {                   
        let birbGifs = ["https://giphy.com/gifs/jVEPGJEn9gT269bDCo", "https://giphy.com/gifs/2wZ07PIbTSbenXUTxM"]
        let sharkGifs = ["https://tenor.com/view/angry-shocked-shark-shark-attack-gif-7814441", "https://tenor.com/view/cat-shark-kitten-surprise-gif-5053865", "https://tenor.com/view/shark-shark-breaching-breaching-ocean-attack-gif-5104846"]
        let tunaGifs = ["https://giphy.com/gifs/calacademy-eating-hungry-cAgGr4wGNRxqEv5V1u", "https://giphy.com/gifs/77mYSerTbrBzW", "https://giphy.com/gifs/supersimple-pets-feeding-ulKHURTkvPoAUG3mzv"]
        let defaultGifs = ["No!"]

        let user = message.mentions.users.first();

        if(args[0].includes('me'))
        {
            if(message.author.id === "97353162532339712")
                return message.channel.send(tunaGifs[Math.floor(Math.random() * tunaGifs.length)]);       
            else if (message.author.id === "318629503830065152")
                return message.channel.send(birbGifs[Math.floor(Math.random() * birbGifs.length)]); 
            else if (message.author.id === "391937000745467904")
                return message.channel.send(sharkGifs[Math.floor(Math.random() * sharkGifs.length)]); 
            else
                return message.channel.send(defaultGifs[Math.floor(Math.random() * defaultGifs.length)]);
        }      
        else if(user != null)
        {
            if(user.id === "97353162532339712")
                return message.channel.send(tunaGifs[Math.floor(Math.random() * tunaGifs.length)]);       
            else if (user.id === "318629503830065152")
                return message.channel.send(birbGifs[Math.floor(Math.random() * birbGifs.length)]);   
            else if (user.id === "391937000745467904")
                return message.channel.send(sharkGifs[Math.floor(Math.random() * sharkGifs.length)]);   
            else
                return message.channel.send(defaultGifs[Math.floor(Math.random() * defaultGifs.length)]);
        }    
        else if(args[0].includes('tuna') || args[0].includes('fish'))
        {
            return message.channel.send(tunaGifs[Math.floor(Math.random() * tunaGifs.length)]); 
        }
        else if(args[0].includes('birb') || args[0].includes('bird'))
        {
            return message.channel.send(birbGifs[Math.floor(Math.random() * birbGifs.length)]); 
        }
        else if(args[0].includes('shark') || args[0].includes('samee') || args[0].includes('summe'))
        {
            return message.channel.send(sharkGifs[Math.floor(Math.random() * sharkGifs.length)]);
        }
        else
            return message.channel.send(defaultGifs[Math.floor(Math.random() * defaultGifs.length)]);
        
    }                    
};


module.exports.help =
{
    name: "feed"
}
