const express = require('express');
const app = express();
app.use(express.json());

// Sample data - rooms and bookings
let rooms = [
  { id: 1, seats: 50, price: 100, amenities: ['projector', 'whiteboard'], bookings: [] },
  { id: 2, seats: 100, price: 200, amenities: ['projector'], bookings: [] },
];

// Create a room
app.post('/rooms', (req, res) => {
  const { seats, price, amenities } = req.body;
  const id = rooms.length + 1;
  const newRoom = { id, seats, price, amenities, bookings: [] };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// Book a room
app.post('/bookings', (req, res) => {
  const { customerName, startDate, endDate, startTime, endTime, roomId } = req.body;
  const room = rooms.find(room => room.id === roomId);
  
  if (!room) {
    res.status(404).json({ error: 'Room not found' });
  } else {
    const newBooking = { customerName, startDate, endDate, startTime, endTime, roomId };
    room.bookings.push(newBooking);
    res.status(201).json(newBooking);
  }
});

// List all rooms with booked data
app.get('/rooms/bookings', (req, res) => {
  const roomsWithBookings = rooms.map(room => ({
    ...room,
    bookings: room.bookings.length,
  }));
  res.json(roomsWithBookings);
});

// List all rooms with customer data
app.get('/rooms/customers', (req, res) => {
  const roomsWithCustomers = rooms.map(room => ({
    ...room,
    customers: room.bookings.map(booking => booking.customerName),
  }));
  res.json(roomsWithCustomers);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
