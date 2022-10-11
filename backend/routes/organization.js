const express = require("express"); 
const router = express.Router();

//importing data model schemas
let { organizationdata } = require("../models/models"); 

//GET organization by name
router.get("/organization/:name", (req, res, next) => { 
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
