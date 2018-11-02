const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user')

const db = "mongodb://usermartin:1234martin@ds249503.mlab.com:49503/eventsdb"

mongoose.connect(db, err => {
  if(err){
    console.error('Error!' + err)
  } else {
    console.log('Connected to mongodb')
  }
})

//test router
router.get('/', (req, res)=> {
  res.send('From API route')
})

//api call to register a new user, save the details into the db and log errors
router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((error, registeredUser) => {
    if(error){
      console.log(error)
    }else {
      let payload = { subject: user._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token })
    }
  })
})

//api call to login a user, check credentials, send back the user details and log errors
//Has 3 checks: existing email, valid email, valid password
router.post('/login', (req, res) => {
  let userData = req.body

  User.findOne({email: userData.email}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      if (!user) {
        res.status(401).send('Invalid email')
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid password')
      } else {
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token })
      }
    }
  })
})

//normal events
//this api endpoint returns a hardcoded array of events in json format
router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },{
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },{
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },{
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }, {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

//special events
//this api endpoint returns a hardcoded array of events in json format
router.get('/special', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },{
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },{
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },{
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }, {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

module.exports = router	//exports router
