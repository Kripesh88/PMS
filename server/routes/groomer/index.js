const express = require('express');
const router= new express.Router();

const confirmAppointmentRoute=require('./appointment');



router.use('/groomer',confirmAppointmentRoute);


module.exports= router;