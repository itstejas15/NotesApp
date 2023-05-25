const express = require("express")
// const mongoose = require("mongoose")
const router = express.Router()
const User = require("../models/userModel")


// Create note - route or api
router.post("/user", async (req, res) => {
    const { title, content } = req.body
    try {
        const userAdded = await User.create({
            title: title,
            content: content,
        })
        res.status(201).json(userAdded)
    } catch (error) {
        console.log("create err =", error)

        //below line was error in my code
        // res.send(400).json({ error: error.message })
        res.status(400).json({ error: error.message })
    }
})

// Read all notes - api
router.get("/users", async (req, res) => {
    try {
        const showUsers = await User.find()
        res.status(200).json(showUsers)
    } catch (error) {
        console.log("read err =", error)
        res.status(500).json({ error: error.message })
    }
    // res.send("api running")
})

// // Read single note - api
router.get("/users/:id", async (req, res) => {
    const { id } = req.params
    try {
        const singleUser = await User.findById({ _id: id })
        res.status(200).json(singleUser)
    } catch (error) {
        console.log("read single user err =", error)
        res.status(500).json({ error: error.message })
    }
    // res.send("api running")
})

//UPDATE - PUT - Api
router.patch("/userupdate/:id", async (req, res) => {
    const { id } = req.params
    // const { name, email, age } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        console.log("update err =", error)
        res.status(500).json({ error: error.message })
    }
    // res.send("api running")
})

//Delete - Api
router.delete("/userdelete/:id", async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteUser)
    } catch (error) {
        console.log("delete err =", error)
        res.status(500).json({ error: error.message })
    }
    // res.send("api running")
})


module.exports = router