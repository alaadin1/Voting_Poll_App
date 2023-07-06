const express = require("express");
const pollRouter = require('./routes/pollsRoute')
const fs = require("fs").promises;
const path = require("path")

const app = express()
const dataFile = path.join(__dirname, "data.json")

//support POST request from a form data with URL encoded 
app.use(express.urlencoded({extended:true}))


//Enable CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next()
})

app.use('/poll', pollRouter)


const PORT = 5500
app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}... `)
})

//recieve data via post