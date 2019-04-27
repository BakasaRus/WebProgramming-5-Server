const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DocSchema = Schema(
    {
        title: {type: String, required: true},
        body: {type: String, required: true},
    },
    { timestamps: true }
);
const Doc = mongoose.model("Doc", DocSchema);
module.exports = Doc;