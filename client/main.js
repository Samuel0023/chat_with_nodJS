//socket del cliente
var socket = io.connect('http://192.168.0.4:6677', { 'forceNew': true });
socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

let render = (data) => {
    let html = data.map((message, indice) => {
        return (`<div class="message">
            <strong>${message.nickname}</strong> dice:
            <p>${message.text}</p>
        </div>`);
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}

var addMessage = (e) => {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = "none";
    socket.emit('add-message', message);
    return false;
}