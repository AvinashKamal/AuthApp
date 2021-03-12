const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')

dotenv.config({ path: './config/config.env' });

//PASSPORT CONFIG
require('./config/passport')(passport)

connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Express Session Middleware
app.use(session({
    secret: 'secretSession',
    resave: false,
    saveUninitialized: false
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});