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
