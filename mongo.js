const mongoose=require('mongoose')
console.log(process.argv )
const password=process.argv[2];
const url=`mongodb+srv://ajaysnaviee:${password}@cluster0.jvsps7g.mongodb.net/Noteapp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false);
mongoose.connect(url);
const db=mongoose.connection;
db.once('connected',()=>{
    console.log("Connected to database");
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
const Note=mongoose.model('Note',noteschema,'notes')
// const note=new Note({
//     content:'callback is easy',
//     important:true
// })
// note.save()
//   .then(result=>{
//     console.log('note saved')
//     mongoose.connection.close()
//   })
  Note.find({},{})
  .then((result)=>{
    result.forEach((note)=>{
        console.log(note)
    })
    mongoose.connection.close()
})