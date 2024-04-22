const express = require('express');

// Middlewares
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors =require('cors');


const app = express();

// Database imports
const mongoose = require('mongoose');


// Routes imports
const incomesRoutes = require('./api/routes/incomes');
const outcomesRoutes = require('./api/routes/outcomes');
const userRoutes = require('./api/routes/users');
const frequentOutcomesRoutes = require('./api/routes/frequent-outcomes');

// database set up
mongoose.set('runValidators', true); // here is your global setting
mongoose.connect('mongodb+srv://sebasrosu:' + 'gzzBcQKctgBBvCil' +'@cluster0.37jkvst.mongodb.net/?retryWrites=true&w=majority');



// Use mehtods for middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Use mehtods for routes
app.use('/incomes', incomesRoutes);
app.use('/outcomes', outcomesRoutes);
app.use('/user', userRoutes);
app.use('/frequent-outcomes', frequentOutcomesRoutes);


// Catch-all route for unspecified paths
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error
        }
    });
});

module.exports = app;