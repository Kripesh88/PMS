const express = require('express');
const router= new express.Router();
const authRoute= require('./authentication');
const appointmentRoute=require('./appointment');
const vetRoute= require('./vet');
const groomerRoute=require('./groomer');
const petRoute= require('./pet');

router.use('/auth', authRoute);
router.use('/appointment',appointmentRoute);
router.use('/vet',vetRoute);
router.use('/groomer',groomerRoute);
router.use('/pet',petRoute);

module.exports= router;