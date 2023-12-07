const { TicketControl } = require('../models/ticket-control');

const ticketControl =  new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguienteTicket();
        callback(siguiente);

        // Notificar que hay nuevo ticket para asignar

    });

    socket.on('atender-ticket', ({escritorio}, callback) =>{
        
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio',
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        // Notificar vamnio en los ultimos4

        if (!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets por atender',
            });
        }else {
            callback({
                ok: true,
                ticket,
            })
        }
    })

}



module.exports = {
    socketController
}

