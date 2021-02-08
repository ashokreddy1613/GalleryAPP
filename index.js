const express = require ('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/route');
const uploadRoutes = require('./routes/uploader');


dotenv.config()

connectDB()

const app = express();

//body parser middleware
// Takes the raw requests and turns them into usable properties on req.body
//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(cors());

//Cors middleware to allow the requests from different origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

//passing local variables 
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

//Routes
app.use('/user', userRoutes);
app.use('/user', uploadRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, 'client','build', 'index.html')); //relative path
  });

}


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
