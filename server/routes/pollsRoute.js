const express = require ('express')
const router = express.Router()

const {getAllVotes,postVotes} = require('../controller/polls')

//set up our routes
router.route('/').get(getAllVotes).post(postVotes)

module.exports = router