const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!")
    console.log(err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/products', async(req, res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', wrapAsync(async(req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))

function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

app.get('/products/:id', wrapAsync(async(req, res, next) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) {
        throw new AppError('Product Not Found', 404);
    }
    res.render('products/show', {product});
}))

app.get('/products/:id/edit', wrapAsync(async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product})
}))

app.put('/products/:id', wrapAsync(async(req, res, next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
}))

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === 'ValidationError') err = handleValidationErr(err);
    next(err);
})

app.use((err, req, res, next) => {
    const{status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("APP IS LESTEING ON PORT 3000!")
})