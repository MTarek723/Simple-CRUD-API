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

//Getting one
router.get('/:id',getsubscriber, (req,res)=> {
    res.json(res.subscriber)
})

//Creating one
router.post('/', async (req,res)=> {
    const subscriber = new Subscriber({
        name: req.body.name
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).send(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Updating one
router.patch('/:id',getsubscriber, async (req,res)=> {
    
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    try {
        const updatedsubscriber = await res.subscriber.save()
        res.json(updatedsubscriber)    
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

//Deleting one
router.delete('/:id',getsubscriber, async (req,res)=> {
    try {
        await res.subscriber.deleteOne()
        res.json({message: "Subscriber Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//middleware function to get the subscriber from the database
async function getsubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber === null) {
            return res.status(404).json({message: 'No Subscriber Found!!'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.subscriber = subscriber
    next()
}