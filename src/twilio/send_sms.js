const accountSid = 'ACf138244c7d1c9c17af1d64ffcc782b7f';
const authToken = '8490a9e1a819b72de44604967c84c9ef';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body:"Hey Man don't forget to take your pills",
        
                from: '+18335861136',
        to: '+13233312681'
    })
    .then(message => console.log(message.sid))
    .done();