let currentPage = 1;
const ticketsPerPage = 1000;
const totalTickets = 10000;
let bookedTickets = [];
let winners = [];

function displayTickets(page) {
    const ticketContainer = document.getElementById('ticketContainer');
    ticketContainer.innerHTML = '';
    const start = (page - 1) * ticketsPerPage + 1;
    const end = page * ticketsPerPage;

    for (let i = start; i <= end; i++) {
        const ticket = document.createElement('div');
        ticket.classList.add('ticket');
        ticket.textContent = i;
        if (bookedTickets.includes(i)) {
            ticket.classList.add('booked');
        }
        ticket.addEventListener('click', () => toggleBooking(i, ticket));
        ticketContainer.appendChild(ticket);
    }
}

function toggleBooking(ticketNumber, ticketElement) {
    if (bookedTickets.includes(ticketNumber)) {
        bookedTickets = bookedTickets.filter(ticket => ticket !== ticketNumber);
        ticketElement.classList.remove('booked');
    } else {
        bookedTickets.push(ticketNumber);
        ticketElement.classList.add('booked');
    }
    document.getElementById('bookedCount').textContent = bookedTickets.length;
}

function displayPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalTickets / ticketsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayTickets(currentPage);
        });
        pagination.appendChild(button);
    }
}

function confirmBooking() {
    const billingSection = document.getElementById('billingSection');
    const bookedTicketsElement = document.getElementById('bookedTickets');
    bookedTicketsElement.textContent = `Booked Tickets: ${bookedTickets.join(', ')}`;
    billingSection.style.display = 'block';
}

function selectWinners() {
    if (bookedTickets.length < 10) {
        alert('Not enough tickets booked to select 50 winners.');
        return;
    }
    winners = bookedTickets.slice(0, 10);
    document.getElementById('winners').textContent = `Winners: ${winners.join(', ')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    displayTickets(currentPage);
    displayPagination();
});
