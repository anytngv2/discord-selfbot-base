module.exports = {
    name: 'ping',

    async execute (message){
        const start = Date.now();
        const sent = await message.channel.send('Pinging...');
        const diff = Date.now() - start;
        sent.edit(`System response time: ${diff}ms`);
    }
}