const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimoscuatro = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimoscuatro = data.ultimoscuatro;
        } else {
            this.reiniciarConteo();
        }

    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimosCuatro() {
        return this.ultimoscuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return ('No hay tickets');
        }

        let numero = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numero, escritorio);
        this.ultimoscuatro.unshift(atenderTicket);
        if (this.ultimoscuatro.length > 4) {
            this.ultimoscuatro.splice(-1, 1);
        }

        console.log('Ultimos Cuatro');
        console.log(this.ultimoscuatro);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimoscuatro: this.ultimoscuatro
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}