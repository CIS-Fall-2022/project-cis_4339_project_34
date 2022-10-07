const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
const organizationModel = require("../models/organization");

//POST create endpoint for a document
router.post('/addorg/', (req, res, next) => {
    organizationModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.send('Org is added to the database');
        }
    });
});

//GET read endpoint to use a query papermeter org or for all org entries
router.get('/allorgs/', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    organizationModel.find((error, data) => {
        if (error) {
                //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    });
    
});

//GET endpoint for retrieving org by _id
router.get('/:id', (req, res, next) => {
    organizationModel.findOne({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else if (data === null) {
            // Sending 404 when not found something is a good practice
            res.status(404).send('Org not found');
        }
        else {
            res.json(data)
        }
    });
});


//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    organizationModel.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//DELETE org by _id
router.delete('/:id', (req, res, next) => {
    //mongoose will use _id of document
    organizationModel.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
            //  res.send('org is deleted');
        }
    });
});

module.exports = router;
