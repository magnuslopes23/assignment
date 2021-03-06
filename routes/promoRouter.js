const express =  require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotions');
const promoRouter = express();
const cors = require('./cors')
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOption, (req,res) =>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Promotion.find({})
    .then((promotions) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOption, (req, res, next) => {
    Promotion.create(req.body)
    .then((promotion) =>{
        console.log('promotion created')
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOption, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOption, (req, res, next) => {
    Promotion.remove({})
    .then((promotions) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(promotions)
    }, (err) => next(err))
    .catch((err) => next(err));

});

promoRouter.route('/:promoId')
.options(cors.corsWithOption, (req,res) =>{res.sendStatus(200);})
.get(cors.cors, (req,res,next) => {
    Promotion.findById(req.params.promoId)
    .then((promotion) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(cors.corsWithOption, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})

.put(cors.corsWithOption, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promoId, {
        $set:req.body
    },{new:true})
    .then((promotion) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOption, (req, res, next) => {
    Promotion.findByIdAndRemove( req.params.promoId)
    .then((promotion) =>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err));

});




module.exports = promoRouter