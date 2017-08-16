/**
 * Created by Sathish on 08/08/17.
 */
var express = require('express');
var router = express.Router();

router.get('/speakers', function (req,res) {
    var data = req.app.get('appData');
    var pagePhotos = [];
    var pageSpeakers = data.speakers;

    pageSpeakers.forEach(function(item){
        pagePhotos = pagePhotos.concat(item.artwork);
    });
    res.render('speakers', {
        pageTitle: 'Speakers',
        artwork: pagePhotos,
        speakers: pageSpeakers,
        pageID: 'speakersList'
    });
});

router.get('/speakers/:speakerid', function (req,res) {
    var data = req.app.get('appData');
    var pagePhotos = [];
    var pageSpeakers = [];

    data.speakers.forEach(function(item){
        if (item.shortname == req.params.speakerid) {
            pageSpeakers.push(item);
            pagePhotos = pagePhotos.concat(item.artwork);
        }
    });
    res.render('speakers', {
        pageTitle: 'Speaker Info',
        artwork: pagePhotos,
        speakers: pageSpeakers,
        pageID: 'speakerDetails'
    });
});

module.exports = router;
