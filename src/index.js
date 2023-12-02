const express = require('express');
const { ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes/index')
const { rateLimit } = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {User , Role} = require('./models');
const role = require('./models/role');
const user = require('./models/user');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // // store: ... , // Use an external store for consistency across multiple server instances.
})

app.use(limiter);

app.use('/api', apiRoutes)
//reverse proxy
//flights
app.use('/flightsService', createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE, changeOrigin: true,
    pathRewrite: {
        '^/flightsService': '/'
    }
}));

//bookings
app.use('/bookingService',
    createProxyMiddleware({
        target: ServerConfig.BOOKING_SERIVCE , changeOrigin: true,
        pathRewrite: {
            '^/bookingService': '/'
        }
    }));



app.listen(ServerConfig.PORT, async function exc() {

    console.log(`Server successfull running on http://localhost:${ServerConfig.PORT}`)
    
    // Logger.info("successfully started the server", "root", {})
})