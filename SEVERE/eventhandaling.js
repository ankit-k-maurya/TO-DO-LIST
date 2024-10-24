var http = require('http');
const events = require('events');
var formidable = require('formidable');
const fs = require('fs');
 
const eventEmitter = new events.EventEmitter();
 
const printMessage = function(){
  console.log('Hey I am on page ABC');
 
}
eventEmitter.on('abc',printMessage);
 
http.createServer(function (req, res) {
    // console.log('req.headers : ',req.headers);
    console.log('req : ',req.url);
    const path = req.url;
    if(path == '/abc')
    {
      eventEmitter.emit('abc');
      res.end('Hey I am on page ABC');
      return;
    }
    if(path== '/123'){
      /**Create file */
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          res.write('File uploaded');
          res.end();
        });
    }
    else{
      console.log('Server is running')
    res.writeHead(201, {'Content-Type': 'text/html'});
    res.end('Hello World!');
    }
}).listen(8000);