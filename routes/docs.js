var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Doc = require('../models/Doc');

mongoose.connect(
    'mongodb://localhost:27017/docs',
    { useNewUrlParser: true, useCreateIndex: true, }
).catch(error => console.error(error));

/* GET docs listing */
router.get('/', function(req, res) {
    Doc.find({}).sort({updatedAt: 'descending'}).exec((err, docs) => {
        if (err)
            return res.status(404).send('Error while getting documents!');
        return res.send({docs});
    });
});

/* GET single doc */
router.get('/:id', function(req, res) {
    Doc.findById(req.params.id, (err, doc) => {
        if (err)
            return res.status(404).send({message: err.message});
        return res.send({ doc });
    })
});

/* POST new doc */
router.post('/', function(req, res) {
    let doc = new Doc({
        body: req.body.body,
        title: req.body.title
    });

    doc.save(err => {
        if (err)
            return res.status(404).send({message: err.message});
        return res.send({ doc });
    })
});

/* PUT updated doc */
router.put('/:id', function(req, res) {
    Doc.findByIdAndUpdate(req.params.id, {
        body: req.body.body,
        title: req.body.title
    }, {new: true}, function(err, doc) {
        if (err)
            return res.status(404).send({message: err.message});
        return res.send({ doc });
    })
});

/* DELETE unnecessary doc */
router.delete('/:id', function (req, res) {
    Doc.findByIdAndDelete(req.params.id, {}, function (err, doc) {
        if (err)
            return res.status(404).send({ message: err.message });
        return res.send({ doc });
    })
});

module.exports = router;
