var m = require('mraa');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var io = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/86Duino.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);

var server = http.createServer(app);

server.listen(app.get('port'));
console.log('ready');
serv_io = io.listen(server);

var gpio0 = new m.Gpio(10);
var gpio1 = new m.Gpio(11);
var gpio2 = new m.Gpio(31);
var gpio3 = new m.Gpio(32);

gpio0.dir(m.DIR_OUT);
gpio1.dir(m.DIR_OUT);
gpio2.dir(m.DIR_OUT);
gpio3.dir(m.DIR_OUT);

serv_io.sockets.on('connection', function (socket) {
	socket.on('move', function (data) {
        if('0' == data.cmd) //stop
        {
			gpio0.write(0);
			gpio1.write(0);
			gpio2.write(0);
			gpio3.write(0);
        }
		else if('1' == data.cmd) //up
        {
			gpio0.write(0);
            gpio1.write(1);
            gpio2.write(0);
            gpio3.write(1);
        }
        else if('2' == data.cmd) //left
        {
			gpio0.write(0);
            gpio1.write(1);
            gpio2.write(1);
            gpio3.write(0);
        }
        else if('3' == data.cmd) //right
        {
			gpio0.write(1);
            gpio1.write(0);
            gpio2.write(0);
            gpio3.write(1);
        }
        else if('4' == data.cmd) //down
        {
			gpio0.write(1);
            gpio1.write(0);
            gpio2.write(1);
            gpio3.write(0);
        }
	});
});
