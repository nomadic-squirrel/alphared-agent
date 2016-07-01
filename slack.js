var request = require( 'request' );
var config  = require( 'config' );

module.exports = function( text ) { 

  var payload = { 
    "text": text,
    "username": config.get( 'agent_name' )
  };

  var options = {
    url: config.get( 'slack_webhook' ),
    form: 'payload=' + JSON.stringify( payload )
  };
  
  
  request.post( options, function( err, httpResponse, body ) {
      if( err ) {
          console.log( 'ERROR: ' + err + '. httpResponse' );
          return;
      }
  });

};
