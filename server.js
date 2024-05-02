const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())

//import routes
const userRoutes = require('./routes/userRoutes');
const storyRoutes = require('./routes/storyRoutes')

dotenv.config();


const corsOptions = {
    origin: '*',
    // origin: process.env.Frontend_PORT,

    credentials: true
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


//addding routes in the middleware
app.use('/api/user', userRoutes)
app.use('/api/story', storyRoutes)


//db connected
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MongoDB_URL)
        .then(() => {
            console.log('MongoDB Connected');
            console.log(`App listting at http://localhost:${process.env.PORT}`);
        }).catch((error) => {
            console.log(error);
        })
})
