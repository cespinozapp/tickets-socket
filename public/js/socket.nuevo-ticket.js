//comando para establecer la comunicacion

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect',
    function() {
        console.log('Conectado al servidor ...');
    });

socket.on('disconnect',
    function() {
        console.log('Perdimos conexion desde el servidor ...');
    });

socket.on('estadoActual', function(actualTicket) {
    label.text(actualTicket.actual);
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });

})