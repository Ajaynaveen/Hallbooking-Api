const express = require('express');
const app = express();
app.use(express.json());

// Sample data - rooms and bookings
let rooms = [
  { id: 1, name: 'Hall A', seats: 50, price: 100, amenities: ['projector', 'whiteboard'], status:'unbooked', bookings: [] },
  { id: 2, name: 'Hall B', seats: 100, price: 200, amenities: ['projector'], status:'unbooked', bookings: [] }
];

// Create a room
app.post('/rooms', (req, res) => {
  const { name, seats, price, amenities } = req.body;
  const id = rooms.length + 1;
  let status="unbooked"
  const newRoom = { id, name, seats, price, amenities,status, bookings: [] };
  rooms.push(newRoom);
  res.status(201).json(newRoom);

});

app.get('/rooms',(req,res)=>{
    const roomsWithBookings = rooms.map(room => ({
        ...room,
        bookingsdetails: room.bookings.length
      }));
      res.json(roomsWithBookings);
    })


  



// Book a room
app.post('/bookings', (req, res) => {
  const { customerName, startDate, endDate, startTime, endTime, roomId } = req.body;
  const room = rooms.find(room => room.id === roomId);
  room.status="booked"

  if (!room) {
    res.status(404).json({ error: 'Room not found' });
  } else {
    const bookingId = room.bookings.length + 1;
    const newBooking = { bookingId, customerName, startDate, endDate, startTime, endTime, roomId };
    room.bookings.push(newBooking);
    res.status(201).json(newBooking);
  }
})

// List all rooms with booked data
app.get('/rooms/info', (req, res) => {
  const roomsWithBookings = rooms.map(room => {
    const bookingsWithCount = room.bookings.map(booking => ({
    //   ...booking,
      roomName: room.name,
      customerName:booking.customerName,
      startDate:booking.startDate,
      endDate:booking.endDate,
      startTime:booking.startTime,
      endTime:booking.endTime,
      status:room.status,
      customerBookings: room.bookings.filter(b => b.customerName === booking.customerName).length,
      
      
      


    
    }));

    return {
      
      bookings: bookingsWithCount
    };
  });

  res.json(roomsWithBookings);
});

// // List all rooms with customer data
app.get('/customers/info', (req, res) => {
  const roomsWithCustomers = rooms.map(room => {
    const customersWithBookings = [...new Set(room.bookings.map(booking => booking.customerName))];
    console.log(customersWithBookings)

    return {
      
      customers: customersWithBookings.map(customer => {
        const customerBookings = room.bookings.filter(booking => booking.customerName === customer);
        console.log(customerBookings)
        return {
          customerName: customer,
          bookings: customerBookings,
        };
      }),
    };
  });

  res.json(roomsWithCustomers);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
console.log("hii this is finished")