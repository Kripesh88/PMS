const express = require('express');
const router= new express.Router();
const authRoute= require('./authentication');

router.use('/auth', authRoute);
module.exports= router;