require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleware
app.use(cors());
app.use(express.json());

// connect to the database
const url = process.env.MONGODB_URI;

// set the strictQuery to false, so that it will disable the strict mode for the query filters
// mongoose will not throw any error when we use an undefined field in the query (ignored)
mongoose.set('strictQuery', false);

// to connect to the database
mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB Database');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    })

// create a model
const Note = require('./models/note');

// set the endpoints

const getAllNotes = require('./routes/getallroutes');
const Createnotes=require('./routes/createnote')
const Getonenotes=require('./routes/getonenote')

// fetches all resources in the collection
app.use('/api/notes', getAllNotes);


// creates a new resource based on the request data
app.use('/api/notes', Createnotes)

// fetching a sigle resource
app.use('/api/notes/', Getonenotes)

// deleting a resource
app.delete('/api/notes/:id', (request, response) => {
    // get the id of the resource from params
    const id = request.params.id;

    Note.findByIdAndDelete(id)
        .then((deletedNote) => {
            if (!deletedNote) {
                return response.status(404).json({ error: 'Note not found' });
            }
            response.status(204).json({ message: 'Note deleted successfully' });
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });
});

// replace the entire identified resource with the request data
app.put('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const noteToPut = request.body;

    Note.findByIdAndUpdate(id, noteToPut)
        .then((updatedNote) => {
            if (!updatedNote) {
                return response.status(404).json({ error: 'Note not found' });
            }
            response.json(updatedNote);
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });
});

app.patch('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const noteToPatch = request.body;

    Note.findByIdAndUpdate(id, noteToPatch)
        .then((updatedNote) => {
            if (!updatedNote) {
                return response.status(404).json({ error: 'Note not found' });
            }
            response.json(updatedNote);
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });
});

// Listen to the PORT for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
