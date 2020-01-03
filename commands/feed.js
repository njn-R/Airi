const Discord = require("discord.js")

module.exports =
{
    name: 'feed',
    description: 'Feed someone',
    execute(message, args)
    {                   
        let birbGifs = ["https://tenor.com/view/feed-fish-bird-throw-food-catch-gif-13838907",
                        "https://giphy.com/gifs/jVEPGJEn9gT269bDCo", "https://giphy.com/gifs/2wZ07PIbTSbenXUTxM", 
                        "https://tenor.com/view/feed-baby-bird-yum-nom-nom-gif-13782572"]
        let sharkGifs = ["https://tenor.com/view/ocean-wow-amazing-eat-catch-gif-3462912",
                        "https://tenor.com/view/shark-sharkbite-computer-like-lol-gif-5054888",
                        "https://media.giphy.com/media/kJf7k5lGDQ12M/giphy.gif"]
        let tunaGifs = ["https://tenor.com/view/feeding-the-fish-feed-the-fish-fish-feed-gif-14011642", 
                        "https://giphy.com/gifs/calacademy-eating-hungry-cAgGr4wGNRxqEv5V1u", 
                        "https://tenor.com/view/fish-feed-steam-struggle-gif-7881662", 
                        "https://tenor.com/view/feed-me-hungry-eating-spoon-full-bite-gif-14656605"]
        let mouseGifs = ["https://tenor.com/view/ratatouille-cute-rat-eating-spaghetti-gif-15430973", 
                        "https://tenor.com/view/pumpkin-pie-pilgrim-pie-eating-pie-happy-thanksgiving-gif-12857426", 
                        "https://tenor.com/view/mouse-flower-baby-mouse-cute-animals-gif-3544689"];
        let nonaGifs = ["https://tenor.com/view/eat-kirby-anime-gif-4848690",
                        "https://tenor.com/view/anime-eating-gif-8951338",
                        "https://tenor.com/view/anime-eating-gif-9340206"]
        let rockGifs = ["https://i.imgur.com/ibeSqc8.gifv"]
        let kariGifs = ["https://tenor.com/view/cute-kitten-feed-me-gif-5668010", 
                        "https://tenor.com/view/food-eat-cat-feed-gif-12269959", 
                        "https://tenor.com/view/cats-kittens-hungry-cute-milk-gif-3487602",
                        "https://tenor.com/view/cat-cartoon-anime-feed-snack-gif-9032297", 
                        "https://tenor.com/view/cat-fork-table-manners-eating-gif-3520753"]
        let sankakuGifs = ["https://tenor.com/view/itsatrap-anime-trap-funny-gif-8431155", 
                        "https://tenor.com/view/anime-food-yummy-yum-nom-gif-10281568", 
                        "https://tenor.com/view/mc-donalds-anime-love-food-gif-9102220", 
                        "https://tenor.com/view/anime-foodwars-food-gif-7677145"]
        let mikoGifs = ["https://tenor.com/view/anime-feed-shy-annoyed-embarrassed-gif-9340097",
                        "https://tenor.com/view/shamiko-eating-machikado-mazoku-yuko-yoshida-gif-14615737",
                        "https://tenor.com/view/eat-anime-mad-angry-gif-15485137",
                        "https://tenor.com/view/lewd-anime-anime-eat-gif-15405723"]
        let defaultGifs = ["https://tenor.com/view/anime-steal-food-gif-10194720", 
                        "https://tenor.com/view/so-moe-feed-food-hungry-anime-gif-8636201", 
                        "https://tenor.com/view/kanna-kamui-gif-10168208",
                        "https://tenor.com/view/itsatrap-anime-trap-funny-gif-8431155", 
                        "https://tenor.com/view/anime-food-yummy-yum-nom-gif-10281568", 
                        "https://tenor.com/view/mc-donalds-anime-love-food-gif-9102220", 
                        "https://tenor.com/view/anime-foodwars-food-gif-7677145"]
        
        let user = message.mentions.users.first()
        if(args[0] === 'me')
        {
            switch(message.author.id)
            {
                case "97353162532339712":  message.channel.send(tunaGifs[Math.floor(Math.random() * tunaGifs.length)])
                                           break
                case "318629503830065152": message.channel.send(birbGifs[Math.floor(Math.random() * birbGifs.length)])
                                           break 
                case "391937000745467904": message.channel.send(sharkGifs[Math.floor(Math.random() * sharkGifs.length)])
                                           break                            
                case "125532768099631104": message.channel.send(mouseGifs[Math.floor(Math.random() * mouseGifs.length)])
                                           break 
                case "480464745921642497": message.channel.send(nonaGifs[Math.floor(Math.random() * nonaGifs.length)])
                                           break
                case "265512952361254913": message.channel.send(rockGifs[Math.floor(Math.random() * rockGifs.length)])
                                           break
                case "153378756310990848": message.channel.send(kariGifs[Math.floor(Math.random() * kariGifs.length)])
                                           break
                case "614233366904176641": message.channel.send(sankakuGifs[Math.floor(Math.random() * sankakuGifs.length)])
                                           break
                case "406708783981789194": message.channel.send(mikoGifs[Math.floor(Math.random() * mikoGifs.length)])
                                           break    
                                default  : message.channel.send(defaultGifs[Math.floor(Math.random() * defaultGifs.length)]) 
                                           break                                    
            }
        }      
        else if(user != null)
        {   
            switch(user.id)
            {
                case "97353162532339712":  message.channel.send(tunaGifs[Math.floor(Math.random() * tunaGifs.length)])
                                           break
                case "318629503830065152": message.channel.send(birbGifs[Math.floor(Math.random() * birbGifs.length)])
                                           break 
                case "391937000745467904": message.channel.send(sharkGifs[Math.floor(Math.random() * sharkGifs.length)])
                                           break                            
                case "125532768099631104": message.channel.send(mouseGifs[Math.floor(Math.random() * mouseGifs.length)])
                                           break 
                case "480464745921642497": message.channel.send(nonaGifs[Math.floor(Math.random() * nonaGifs.length)])
                                           break
                case "265512952361254913": message.channel.send(rockGifs[Math.floor(Math.random() * rockGifs.length)])
                                           break
                case "153378756310990848": message.channel.send(kariGifs[Math.floor(Math.random() * kariGifs.length)])
                                           break
                case "614233366904176641": message.channel.send(sankakuGifs[Math.floor(Math.random() * sankakuGifs.length)])
                                           break
                case "406708783981789194": message.channel.send(mikoGifs[Math.floor(Math.random() * mikoGifs.length)])
                                           break    
                                default  : message.channel.send(defaultGifs[Math.floor(Math.random() * defaultGifs.length)])  
                                           break                                   
            }
        }    
        else if(args[0].includes('tuna') || args[0].includes('fish'))
            return message.channel.send(tunaGifs[Math.floor(Math.random() * tunaGifs.length)]); 
        else if(args[0].includes('birb') || args[0].includes('bird'))
            return message.channel.send(birbGifs[Math.floor(Math.random() * birbGifs.length)]); 
        else if(args[0].includes('shark') || args[0].includes('samee') || args[0].includes('summe'))      
            return message.channel.send(sharkGifs[Math.floor(Math.random() * sharkGifs.length)]);       
        else if(args[0].includes('mouse') || args[0].includes('mousy') || args[0].includes('epicmouse'))    
            return message.channel.send(mouseGifs[Math.floor(Math.random() * mouseGifs.length)]);
        else if (args[0].includes('nona') || args[0].includes('nano') || args[0].includes('non')) 
            return message.channel.send(nonaGifs[Math.floor(Math.random() * nonaGifs.length)]);
            else if (args[0].includes('rock') || args[0].includes('rabbit') || args[0].includes('rocket') || args[0].includes('boss') || args[0].includes('verda'))
            return message.channel.send(rockGifs[Math.floor(Math.random() * rockGifs.length)]);
        else if (args[0].includes('kari') || args[0].includes('curry') || args[0].includes('curri')) 
            return message.channel.send(kariGifs[Math.floor(Math.random() * kariGifs.length)]);
        else if (args[0].includes('sankaku') || args[0].includes('furuhashi') || args[0].includes('sankaku complex')) 
            return message.channel.send(sankakuGifs[Math.floor(Math.random() * sankakuGifs.length)]);
        else if (args[0].includes('miko') || args[0].includes('devilmiko') || args[0].includes('baka miko')) 
            return message.channel.send(mikoGifs[Math.floor(Math.random() * mikoGifs.length)]);
        else
            return message.channel.send(defaultGifs[Math.floor(Math.random() * defaultGifs.length)]);
        
    }                    
};


module.exports.help =
{
    name: "feed"
}
