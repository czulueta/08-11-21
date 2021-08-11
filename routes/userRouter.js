const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")

userRouter.get("/todoId", (req, res, next) => {
    User.findById({ _id: req.params.todoId }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})
userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body) 
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})
userRouter.delete("/userId", (req, res, next) => {
    User.findOneAndDelete(
        { _id: req.params.userId }, 
        (err, deletedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(
                `Sorry to see you go ${deletedUser.userName} but if you change your mind we can always create you a new account have a blessed day.`
            )
    })
})
userRouter.put("/userId", (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.params.userId }, 
        req.body, 
        {new: true}, 
        (err, updatedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
    })
})

module.exports = userRouter