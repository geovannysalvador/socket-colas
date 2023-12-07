const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor(){
        this.ultimimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    // Llamar la instrucion y generar la data o grabar
    get toJson (){

        return{
            ultimimo: this.ultimimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }

    }

    // Leer el archivo jSon
    init(){
        const {hoy, tickets, ultimimo, ultimos4} = require('../db/data.json');
        // Verificar el dia para cargarlo 
        if( hoy === this.hoy){
            this.tickets = tickets;
            this.ultimimo = ultimimo;
            this.ultimos4 = ultimos4;
        }else{
            // es otro dia
            this.guardarDB();
        }
    }

    guardarDB(){

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify(this.toJson) )
    }

    siguienteTicket(){

        this.ultimimo += 1;
        const ticket = new Ticket(this.ultimimo, null);
        // Insertar en el arreglo 
        this.tickets.push( ticket );

        this.guardarDB();
        return 'Ticket ' + ticket.numero;

    }

    atenderTicket(escritorio){

        // No tenemos ticket 
        if (this.tickets.length === 0){
            return null;
        }

        // const ticket = this.tickets[0];
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        // mandar los ultimos 4 al principio 
        this.ultimos4.unshift(ticket);

        if(this.ultimos4 > 4 ){
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();
        return ticket;

    }


}

module.exports = {
    TicketControl,
    Ticket,
}