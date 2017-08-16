/**
 * Created by Sathish on 14/08/17.
 */
var express = require('express');
var router = express.Router();
var feedbackData = require('../data/feedbacks.json');
var bodyParser = require('body-parser');
var fs = require('fs');

router.get('/api', function (req,res) {
    res.json(feedbackData);
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api', function (req,res) {
   feedbackData.unshift(req.body);
   fs.writeFile('app/data/feedbacks.json',JSON.stringify(feedbackData),'utf8',
   function(err){
       if (err){
        console.log(err);
       }
   });
   res.json(feedbackData);
});

router.delete('/api/:id', function (req,res) {
    feedbackData.splice(req.params.id, 1);
    fs.writeFile('app/data/feedbacks.json',JSON.stringify(feedbackData),'utf8',
    function(err){
        if (err){
            console.log(err);
        }
    });
    res.json(feedbackData);
});

module.exports = router;