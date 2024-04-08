const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let bookedSpots = [];

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('updateSpots', bookedSpots);

    socket.on('toggleSpot', (spotNumber) => {
        const index = bookedSpots.indexOf(spotNumber);
        if (index === -1) {
            bookedSpots.push(spotNumber);
        } else {
            bookedSpots.splice(index, 1);
        }
        io.emit('updateSpots', bookedSpots);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the correct MIME type for CSS files
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});