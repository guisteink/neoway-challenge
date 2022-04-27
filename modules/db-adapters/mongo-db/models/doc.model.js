const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
    type: { type: String, required: true },
    number: { type: String, required: true },
    isValid: { type: Boolean, default: false }
},
    { timestamps: true });

const DocModel = mongoose.model("Doc", DocSchema);

module.exports = DocModel;