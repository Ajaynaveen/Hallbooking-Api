const bcrypt=require('bcrypt')
const usersRouter=require('express').Router();
const User=require('../models/user')


usersRouter.post('/',async(request,response)=>{
    const {username,name,password}=request.body;
    //create a hashed password using the password entered buy the user
    const saltrounds=10;
    const passwordHash=await bcrypt.hash(password,saltrounds)

    // crerate a user object to store into the database

    const user=new User({
        username,
        name,
        passwordHash

    })
   const saveduser= await user.save();
   response.status(201).json(saveduser)


})
// route for getting all users  
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { content: 1, important: 1});
    response.json(users);
});
module.exports=usersRouter