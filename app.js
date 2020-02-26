require("dotenv").config()

const express = require('express')
const app = express()
const handler = require("./modules/handler/api_handler")
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

app.use("/api", handler)

app.listen(process.env.APP_PORT, ()=>{
    console.log("running on port" + process.env.APP_PORT)
})