document.addEventListener("DOMContentLoaded", function () {
    const parking = document.getElementById('parking');
    const socket = io('http://localhost:3000');

    socket.on('updateSpots', (bookedSpots) => {
        renderParkingSpots(bookedSpots);
    });

    function renderParkingSpots(bookedSpots) {
        parking.innerHTML = '';
        for (let i = 1; i <= 10; i++) {
            const spot = document.createElement('div');
            spot.classList.add('parking-spot');
            if (bookedSpots.includes(i)) {
                spot.classList.add('taken');
            } else {
                spot.classList.add('empty');
            }
            spot.textContent = i;
            spot.addEventListener('click', () => toggleSpot(i));
            parking.appendChild(spot);
        }
    }

    function toggleSpot(spotNumber) {
        socket.emit('toggleSpot', spotNumber);
    }
});