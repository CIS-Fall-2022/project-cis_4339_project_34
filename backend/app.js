const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //better debugging
const cors = require("cors");
//allow using a .env file
require("dotenv").config();   

//creates a new instance of express application
const app = express();

// add cors header to the server
app.use(cors({
  origin: '*'
}));

//sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

//declare port number for the api
const PORT = process.env.PORT || 3000;

//setup
app.use(express.json());
app.use(morgan("dev"));

//import routes
const primaryDataRoute  = require('./routes/primaryData');
const eventsDataRoute  = require('./routes/eventsData');

//setup middle ware for routes
app.use('/primaryData', primaryDataRoute);
app.use('/eventData', eventsDataRoute)

//create an endpoint to get all primarydata from the API
app.get('/getprimarydata', (req, res, next) => {
  //very plain way to get all the data from the collection through the mongoose schema
  primaryDataRoute.find((error, data) => {
      if (error) {
        //here we are using a call to next() to send an error message back
        return next(error)
      } else {
        res.json(data)
      }
    })
});

//create an endpoint to get all allevents from the API
app.get('/geteventsdata', (req, res, next) => {
  //very plain way to get all the data from the collection through the mongoose schema
  eventsDataRoute.find((error, data) => {
      if (error) {
        //here we are using a call to next() to send an error message back
        return next(error)
      } else {
        res.json(data)
      }
    })
});

//delete a primarydata by id
app.delete('/deleteprimarydata/:id', (req, res, next) => {
  //mongoose will use primarydataID of document
  primaryDataRoute.findOneAndRemove({ _id: req.params.id}, (error, data) => {
      if (error) {
        return next(error);
      } else {
         res.status(200).json({
           msg: data
         });
        res.send('Primary Data has been deleted');
      }
    });
});

//delete a primarydata by id
app.delete('/deleteeventdata/:id', (req, res, next) => {
  //mongoose will use primarydataID of document
  eventsDataRoute.findOneAndRemove({ _id: req.params.id}, (error, data) => {
      if (error) {
        return next(error);
      } else {
         res.status(200).json({
           msg: data
         });
        res.send('Primary Data has been deleted');
      }
    });
});


// endpoint that will create a student document
app.post('/addprimarydata', (req, res, next) => {
  primaryDataRoute.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        // res.json(data)
        res.send('Pimrary data is added to the database');
      }
  });
});

// endpoint that will create a student document
app.post('/addeventsdata', (req, res, next) => {
  eventsDataRoute.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        // res.json(data)
        res.send('Event data is added to the database');
      }
  });
});

//

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

//error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode)
    err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
