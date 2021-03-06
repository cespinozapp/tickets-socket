var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect',
    function() {
        console.log('Conectado al servidor ...');
    });

socket.on('disconnect',
    function() {
        console.log('Perdimos conexion desde el servidor ...');
    });

socket.on('estadoActual', function(actualTicket) {
    console.log(actualTicket.actual);
    console.log(actualTicket.ultimosCuatro);
    actualizaHTML(actualTicket.ultimosCuatro);

});

socket.on('ultimosCuatro', function(resp) {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(resp.ultimosCuatro);
});

function actualizaHTML(ultimosCuatro) {

    for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].text('Tickets ' + ultimosCuatro[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimosCuatro[i].escritorio);
    }
}