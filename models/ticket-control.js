const path = require('path');
const fs = require('fs');
const { json } = require('express');

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


}

module.exports = {
    TicketControl
}