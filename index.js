const express = require('express');
const app = express();

// data
let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only Javascript',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
];

// set the endpoints

// root end point: prints hello world as an HTML
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

// fetches all resources in the collection
app.get('/api/notes', (request, response) => {
    response.json(notes);
});

// creates a new resource based on the request data
app.post('/api/notes', (request, response) => {
    response.status(201).json({ message: 'note created successfully' });
});

// fetching a sigle resource
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id == id);
    response.json(note);
});

// Listen to the PORT for requests
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});