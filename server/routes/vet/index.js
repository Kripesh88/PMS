const express = require('express');
const router= new express.Router();

const confirmAppointmentRoute=require('./appointment');



router.use('/vet',confirmAppointmentRoute);


module.exports= router;