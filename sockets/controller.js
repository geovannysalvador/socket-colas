const { TicketControl } = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    //  ttodos esos emit es cuano un nuevo cliente se conecta estos manda no escucha
    // Cuando el socket se conecte 
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    // Mandarlo desde que se conecte
    socket.emit('estado-actual', ticketControl.ultimos4);
    // Escuchando la cola pendiente por atender
    socket.emit('tickets-pendientes', ticketControl.tickets.length);




    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketControl.siguienteTicket();
        callback(siguiente);

        // Notificar que hay nuevo ticket para asignar
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    });



    socket.on('atender-ticket', ({ escritorio }, callback) => {

        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio',
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        // Notificar vamnio en los ultimos4
        // Mandarlo desde que se conecte
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        // emitir los tickets pendientes a todos
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets por atender',
            });
        } else {
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

