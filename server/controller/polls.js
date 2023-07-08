const fs = require("fs").promises;
const path = require("path")
const Votes = require('../models/voting')


const dataFile = path.join(__dirname,"..", "data.json")

const getAllVotes = async (req,res)=>{

    //take our json file and read the data inside
    let data =  JSON.parse(await fs.readFile(dataFile, 'utf8'))
    
    //to find the perecent, we need two things: the total votes and the indivudal votes

    //get total vote buy looping through the values of the obj and adding them up
    // Object.values loops through the values and returns an arr of all the value. 
    // then .reduce adds those values in the arr
    const totalVotes = Object.values(data).reduce((total, num) => total += num, 0)


    //Now we need to iterate through the our obj and find the percentage 
    data = Object.entries(data).map(([label,votes]) => {
        return {
            label,
            percentage: (((100 *votes)/totalVotes) || 0).toFixed(0)
        }
    })

    res.json(data)

}

const postVotes = async(req,res) =>{

    //take our json file and read the data inside
    let data =  JSON.parse(await fs.readFile(dataFile, 'utf8'))

    //get the information from our request body (the form)
    let value = req.body.add
    data[value]++

    await fs.writeFile(dataFile, JSON.stringify(data))
    res.end(`${value} has been updated!`)
}

const getDB = async (req,res) =>{
    const votes = await Votes.create(req.body)
    res.send(votes)
}


module.exports = {
    getAllVotes,
    postVotes, 
    getDB
}