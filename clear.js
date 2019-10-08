module.exports =
    {
	    name: 'clear',
	    description: 'Clears 100 messages',
        execute(message)
        {
            message.channel.bulkDelete(100);        
        }
};