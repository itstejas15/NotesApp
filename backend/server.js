const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors");

app.use(cors());

const userRouter = require("./router/userRoute")

app.use(express.json())

mongoose.connect(process.env.MongoURL)
    .then(() => {
        console.log("Connected Successfully")
        app.listen(process.env.PORT || 5000, (err) => {
            if (err) console.log(err)
            console.log(`running at port 5000`)
        })
    })
    .catch((error) => console.log("Failed to connect mongoDB : ", error))

app.use(userRouter)