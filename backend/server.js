const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(postRoutes);


const PORT = 8000;
const DB_URL = 'mongodb+srv://ywd:test123@mernapp.rfart.mongodb.net/mernCrud?retryWrites=true&w=majority&appName=mernApp'


mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB connected..');
})
.catch((err)=>console.log('DB connection error',err));



app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
})
