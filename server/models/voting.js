const mongoose = require('mongoose')

const votingSchema = new mongoose.Schema({
    name:{
        type:String
    },
    votes:{
        type: Number
    }


})


module.exports = mongoose.model('Votes', votingSchema)
