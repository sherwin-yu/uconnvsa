//------------------------------------------------------------------------------
// Website for the University of Connecticut Vietnamese Student Assocation
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

//needed for req.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mail
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

//VCAP Environment Variables
var vcap = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : null;

if (!vcap) {
  vcap = require('./local'); //if running locally, ask sherwin for local.js file
}

//sendgrid for mail
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var sendgrid_api_key = vcap['user-provided'][0].credentials.sendgrid_api_key;
var sendEmailTo = vcap['user-provided'][0].credentials.email;

app.post('/sendEmail', function(req, res){
  console.log('reqbody', req.body);
    var options = {
        auth: {
            api_key: sendgrid_api_key
        }
    }
    var mailBody = {
      to: [sendEmailTo],
      from: req.body.from,
      subject: req.body.subject,
      html: "<b>" + req.body.name + " sent you a message: </b> <p>" + req.body.message + "</p>"
    };
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(mailBody, function(error, info){
        if(error){
            res.status('401').json({err: info});
        }else{
            res.status('200').json({success: true});
        }
    });
});



//add middleware to serve static files from /public or /dist
var content_path;
if(process.env.NODE_ENV) {
    if(process.env.NODE_ENV == 'production') {
        console.log('in production');
        content_path = 'dist';
    } else if(process.env.NODE_ENV == 'development') {
        console.log('in development');
        content_path = 'dist';
    } else {
        console.log('in ' + process.env.NODE_ENV);
        content_path = 'public';
    }
} else {
    content_path = 'public';
}

app.use(express.static(__dirname + '/' + content_path));

app.use(function(req, res){
  res.sendFile('index.html', {root : __dirname + '/' + content_path})
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
