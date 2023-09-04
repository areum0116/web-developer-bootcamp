const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');

// morgan('tiny');

// app.use(morgan('tiny'));  // execute every single time when sending a request
app.use(morgan('tiny'));

// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!");
//     return next();
//     console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()");
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!");
//     next();
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY THIRD MIDDLEWARE!!!");
//     next();
// })

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!");
    next();
})

const verifyPassword = (req, res, next) => {
    const {password} = req.query;
    if(password === 'chickennugget') {
        next();
    }
    // res.send('SORRY YOU NEED A PW!');
    // res.send(401);
    throw new AppError('Password required!', 401);
}



app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE!');
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('WOOF WOOF!');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to strangers!');
})

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/admin', (req, res) => {
    throw new AppError('Yor are not an Admin!', 403);
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND^^');
})

// app.use((err, req, res, next) => {
//     console.log("**********************************");
//     console.log("*************ERROR***************");
//     console.log("**********************************");
//     // res.status(500).send("OH BOY, WE GOT AN ERROR!!!");
//     next(err);
// })

app.use((err, req, res, next) => {
    const {status = 500, message = 'Someting Went Wrong'} = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})