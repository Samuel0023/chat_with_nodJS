var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));
app.get('/hola-mundo', (req, res, next) => {
    res.status(200).json({ message: 'Estás conectado a nuestra API' })
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'an error occurred' });
});

var messages = [{
    id: 1,
    text: "welcome welcome",
    nickname: 'korone'
}];
io.on('connection', (socket) => {
    console.log("Cliente conectado!! ip" + socket.handshake.address + ' se ha conectado');
    socket.emit('messages', messages);

    socket.on('add-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});



server.listen(6677, () => {
    console.log('servidor escuchando en el puerto http://localhost:6677');
});