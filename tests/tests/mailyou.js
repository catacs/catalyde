var nodemailer = require('nodemailer');

// Create a Sendmail transport object
var mail =  nodemailer.createTransport("Sendmail");

console.log('Sendmail Configured');

// Message object
var message = {
    
    // sender info
    from: 'no-reply@ojete.com',
    
    // Comma separated list of recipients
    to: 'catalin.inf@gmail.com',
    
    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔', //

    // plaintext body
    text: 'Hello to myself!',
    
    // HTML body
    html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
         '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@node"/></p>'
};

console.log('Sending Mail');

mail.sendMail(message, function(error){
    if(error){
        console.log('Error occured');
        console.log(error.message);
        return;
    }
    else
        console.log('Message sent successfully!');
});