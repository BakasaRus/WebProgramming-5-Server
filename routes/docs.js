var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Doc = require('../models/Doc');

mongoose.connect(
    'mongodb://localhost:27017/docs',
    { useNewUrlParser: true, useCreateIndex: true, }
).catch(error => console.error(error));

/* GET docs listing. */
router.get('/list', function(req, res) {
    Doc.find({}).sort({updatedAt: 'descending'}).exec((err, docs) => {
        if (err) return res.status(404).send('Error while getting documents!');
        return res.send({docs});
    });
});

/* POST new doc. */
router.post('/create', function(req, res) {
    let doc = new Doc({
        body: req.body.body,
        title: req.body.title
    });

    doc.save(err => {
        if (err) return res.status(404).send({message: err.message});
        return res.send({ doc });
    })
});

module.exports = router;
