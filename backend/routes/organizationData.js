const express = require("express"); 
const router = express.Router();

//importing data model schemas
let { organizationdata } = require("../models/models"); 

//GET organization by name
router.get("/:name", (req, res, next) => { 
    organizationdata.findOne( 
        {organizationName:req.params.name},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    )
});

//GET all organization entries
router.get("/", (req, res, next) => { 
    organizationdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'organizationName': -1 }).limit(10)
});

//POST create a orgainzation
router.post("/", (req, res, next) => { 
    organizationdata.create( 
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

//PUT update organzation by name
router.put("/:name", (req, res, next) => {
    organizationdata.findOneAndUpdate(
        { organizationName: req.params.name },
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

//DELETE an orgainzation
router.delete("/:name", (req, res, next) => { 
    organizationdata.deleteOne(
        {organizationName:req.params.name} ,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    )
});




module.exports = router;