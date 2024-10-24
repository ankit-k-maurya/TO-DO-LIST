var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    fs.writeFile('mynewfile2.text','this is my latest',function(err){
        if(err) throw err;
        console.log('Updated');
    });

}).listen(8000)