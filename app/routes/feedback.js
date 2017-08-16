/**
 * Created by Sathish on 08/08/17.
 */
var express = require('express');
var router = express.Router();

router.get('/feedback', function (req,res) {

    res.render('feedback', {
        pageTitle: 'Feedback',
        pageID: 'feedback'
    });
});

module.exports = router;