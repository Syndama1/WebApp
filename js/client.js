const startButton = document.getElementById('start');
var socket = io();

startButton.onclick = function() {

    socket.emit('press');

};

socket.on('numpresses', function(num) {
    document.getElementById('display').innerHTML = num;
});
