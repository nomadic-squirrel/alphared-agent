var request = require( 'request' );
var token = 'MT3FDBHNTFH4B7QYCCTSPY5EBKIBS6NL';

module.exports = function( audioStream, cb ) {
	
  var options = {
    url: 'https://api.wit.ai/speech?v=20160526',
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "audio/wav"
    }
  };
  
  callback = function( err, response, body ) {
    if( err ) {
      console.log( 'Error: ' + err );
      console.log( 'Body: ' + body );
      
      cb( err, null );
    }
    
    else {
      text = JSON.parse( body )._text;
      
      console.log( 'TEXT: ' + text );
      cb( null, text );
    }

  }

  audioStream.pipe( request( options, callback ) );
  
}
