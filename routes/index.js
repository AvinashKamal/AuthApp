const express = require('express');
const router = express.Router();

//@desc     Login Section
//@route    POST /login

router.get('/login', (req, res) => {
    res.send('Login')
})

//@desc     Login Section
//@route    POST /login

router.get('/signup', (req, res) => {
    res.send('SignUp')
})

module.exports = router;