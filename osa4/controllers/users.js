const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    if (typeof body.password === undefined || !body.password || body.password === '') {
        return res.status(400).json({ error: 'password missing'})
    }
    if (body.password.length < 3) {
        return res.status(400).json({ error: 'password should be at least 3 characters long' })
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

module.exports = usersRouter