const express = require ('express')
const router = express.Router()

const {getAllVotes,postVotes,getDB,addOption} = require('../controller/polls')

//set up our routes
router.route('/').get(getAllVotes).post(postVotes)
router.route('/db').get(getDB)
router.route('/addOption').post(addOption)


module.exports = router