const express = require("express");
const pollRouter = require('./routes/pollsRoute')
const connectDB = require('./db/connect')
var bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

//support POST request from a form data with URL encoded 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))


//Enable CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next()
})

app.use('/poll', pollRouter)


const PORT = 5500
const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Listening on PORT ${PORT}... `)
        })

    }
    catch(error){
        console.log(error)
    }
}

start()

//recieve data via post