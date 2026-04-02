const express = require('express');
const router= new express.Router();

const chatBotRoute=require('./chatbot');



router.use('/chatbot',chatBotRoute);


module.exports= router;