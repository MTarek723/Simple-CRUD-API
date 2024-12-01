const express = require('express')
const router = express.Router()
const Subscriber = require('../models/model')

//Getting all
router.get('/', async (req,res)=> {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})