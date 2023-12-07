const { TicketControl } = require('../models/ticket-control');

const ticketControl =  new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguienteTicket();
        callback(siguiente);

        // Notificar que hay nuevo ticket para asignar

    })

}



module.exports = {
    socketController
}

