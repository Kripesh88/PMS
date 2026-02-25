const express = require('express');
const router= new express.Router();

const adminRoute=require('./admin');



router.use('/manage',adminRoute);


module.exports= router;