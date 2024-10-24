var http = require('http');
var fs = require('fs');
 
http.createServer(function(req,res){
    fs.open('writefile.html', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
      });
}).listen(8000)