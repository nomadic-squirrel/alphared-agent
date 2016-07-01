
var fs    = require( 'fs' );
var stt   = require( './stt' );
var slack = require( './slack' );
var config = require( 'config' );

console.log( 'Agent: ' + config.get( 'agent_name' ) );

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


