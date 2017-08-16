/**
 * Created by Sathish on 07/08/17.
 */
/*var http = require('http');
var myServer = http.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("<h1>Welcome to My App!</h1>");
    response.end();
});
myServer.listen(3000);
console.log("Go to http://localhost:3000/");*/

var express = require('express');
var app = express();
var dataFile = require('./data/data.json');
var reload = require('reload');
var io = require('socket.io')();

app.set('port',process.env.PORT || 3000);
app.set('appData',dataFile);
app.set('view engine','ejs');
app.set('views','app/views');

app.locals.siteTitle = "Meetups";
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));

var server = app.listen(app.get('port'),function(){
    console.log("Listening on port " + app.get('port'));
});

io.attach(server);

io.on('connection',function (socket){
    socket.on('postMessage',function (data) {
        io.emit ('updateMessages',data);
    });
});

reload(app);