
var fs    = require( 'fs' );
var os    = require( 'os' );
var say   = require( 'say' );
var config = require( 'config' );

var express      = require('express');
//var bodyParser   = require('body-parser');

var stt   = require( './stt' );
var slack = require( './slack' );


var PORT = config.get( 'express_port' );

// Register the agent with alphabot
registerAgent( PORT, getIPAddress() );


var app = express();

/* 
 *
 *  Example: 
  curl -v -G --data-urlencode "phrase=Brain the size of a planet and that's what they tell me to do" \
  "http://address:3000/speak"
 */
app.all('/speak', function (req, res) {

  var phrase = req.query.phrase;
  if( phrase === undefined || phrase === "" ) {
    res.status( 400 ).send( 'Phrase is undefined.' );
    return;
  }

  console.log( 'Speaking "' + phrase + '"' );
  say.speak( req.query.phrase );

  res.status( 200 ).send( 'OK' );
});



app.post('/irsend', function (req, res) {
  res.status( 200 ).send( 'Hello World!' );
});


app.listen( PORT, function () {

  console.log( 'Alphared ' + config.get( 'agent_name' ) + ' listening on port ' + PORT + '!' );

});


function registerAgent( port, ipaddress ) {
  var botname = '@' + config.get( 'bot_name' );
  var channel = '#' + config.get( 'slack_channel' );

  args = [
      botname,
      "register agent",
      config.get( 'agent_name' ),
      "http://" + ipaddress + ":" + port,
      channel
  ];

  slack( args.join( ' ' ) );
}

function getIPAddress() {
  var address,
  ifaces = os.networkInterfaces();
  for (var dev in ifaces)
    ifaces[dev].filter( (details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined );
  return address;
}

/*
Example of sending a stream to stt
var fileName = 'Set Timer 1hr.wav';

var stream = fs.createReadStream( fileName );

cb = function( err, text ) {
  if( err ) {
    console.log( 'Error! ' + err );
    return;
  }
  
  slack( text );
}


stt( stream, cb );

*/
