const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Emitir al cliente
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        //client.broadcast.emit('siguienteTicket', data);

        callback(ticketControl.siguienteTicket());

        client.broadcast.emit('estadoActual', {

            actual: ticketControl.getUltimoTicket(),
            ultimosCuatro: ticketControl.getUltimosCuatro()
        });

    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimosCuatro', {

            ultimosCuatro: ticketControl.getUltimosCuatro()

        });

        callback(atenderTicket);

    })
});