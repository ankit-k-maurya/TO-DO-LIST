var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
    fs.unlink('writefile.html',function(err){
        if(err) throw err;
        console.log('file Deleted');
    });
}).listen(8080)