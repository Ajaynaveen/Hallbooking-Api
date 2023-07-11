const express = require('express');
const app = express();
app.use(express.json());
const mongoose=require('mongoose')
console.log(process.argv )
const password=process.argv[2];
const url=`mongodb+srv://ajaysnaviee:Nr7SE5I0UjD1wQdC@cluster0.jvsps7g.mongodb.net/Noteapp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false);
mongoose.connect(url);
const db=mongoose.connection;
db.once('connected',()=>{
    console.log("Connected to database");
    // mongoose.Connection.close();
})
db.on('error',console.error.bind(console,'connection error')
    
)
const noteschema=new mongoose.Schema({
    content:String,
    date:{
        type:Date,
        default: Date.now
    },
    important:Boolean
})
noteschema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Note=mongoose.model('Note',noteschema,'notes')


// set the endpoints

// root end point: prints hello world as an HTML


// fetches all resources in the collection
app.get('/api/notes', (request, response) => {
    Note.find({},{})
    .then((notes)=>{
        response.json(notes)
      
      })
});

app.post('/api/notes', (request, response) => {
    // prepare an object to store it in the database
    const note = new Note(request.body);

    // storing the new object to the database
    note.save()
        .then(result => {
            response.status(201).json({ message: 'Note created successfully' });
        });
});

// // fetching a sigle resource
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    Note.findById(id)
        .then((note) => {
            if (!note) {
                return response.status(404).json({ error: 'Note not found' });
            }
            response.json(note);
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });
});

// // deleting a resource
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


// // replace the entire identified resource with the request data
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





// Listen to the PORT for requests
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});