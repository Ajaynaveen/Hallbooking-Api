const mongoose=require('mongoose')
const url=process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

// to connect to the database
mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB Database');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    })


    

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
module.exports = mongoose.model('Note', noteschema);