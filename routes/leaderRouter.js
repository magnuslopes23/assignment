const express =  require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
const leaderRouter = express();
const cors = require('./cors');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOption, (req,res) =>{res.sendStatus(200);})
.get(cors.cors, (req,res,next) => {
    Leaders.find({})
    .then((leaders) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(leaders);
    },(err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOption, (req, res, next) => {
    Leaders.create(req.body)
    .then((leader) =>{
        console.log('leader created')
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOption, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leader');
})
.delete(cors.corsWithOption, (req, res, next) => {
    Leaders.remove({})
    .then((leaders) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
});


leaderRouter.route('/:leaderId')
.options(cors.corsWithOption, (req,res) =>{res.sendStatus(200);})
.get(cors.cors, (req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(cors.corsWithOption, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})

.put(cors.corsWithOption, (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set:req.body
    },{new:true})
    .then((leader) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOption, (req, res, next) => {
    Leaders.findByIdAndRemove( req.params.leaderId)
    .then((leader) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err));

});




module.exports = leaderRouter