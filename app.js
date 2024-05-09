const express = require('express');

// Middlewares
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors =require('cors');


const app = express();

// Database imports
const mongoose = require('mongoose');


// Routes imports
const incomesRoutes = require('./api/components/incomes/incomes.route');
const outcomesRoutes = require('./api/components/outcomes/outcomes.route');
const userRoutes = require('./api/components/user/users.route');
const frequentOutcomesRoutes = require('./api/components/frequent-outcomes/frequent-outcomes.route');
const pushNotificationsRoutes = require('./api/components/push-notifications/push.route');

// database set up
mongoose.set('runValidators', true); // here is your global setting
mongoose.connect('mongodb+srv://sebasrosu:' + process.env.MONGO_PW +process.env.MONGO_CLUSTER).then();



// Use methods for middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Use methods for routes
app.use('/incomes', incomesRoutes);
app.use('/outcomes', outcomesRoutes);
app.use('/user', userRoutes);
app.use('/frequent-outcomes', frequentOutcomesRoutes);
app.use('/push', pushNotificationsRoutes);


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
            message: error.message || 'Something is very wrong'
        }
    });
});

module.exports = app;