var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
fs.rename('mynewfile1.txt','newest file.txt',function(err){
    if(err) throw err ;
    console.log('filerename');
})
}).listen(8000)