// REferencias HTML
const lblEscritorio  = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblticket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');


const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio') ){

    window.location = 'index.html';
    throw new Error('El escitorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;


divAlerta.style.display = 'none'

const socket = io();

socket.on('connect', () => {
    
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    
    // lblNuevoTicket.innerText = "ticket " +  ultimo;
});

btnAtender.addEventListener( 'click', () => {

    // socket.emit('atender-ticket', {escritorio}, (payload) => {
    //     console.log(payload);
    // })

    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg}) => {
        if (!ok){
            lblticket.innerText = 'Nadie ';
            return divAlerta.style.display ='';
        }

        lblticket.innerText = 'Ticket ' + ticket.numero;

    });
    


});