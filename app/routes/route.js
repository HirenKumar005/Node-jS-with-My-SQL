const express = require("express");
const router = express();

const userRoute = require('./router/userRoute');
const categoryRoute = require('./router/categoryRoute');
const contactRoute = require('./router/contactRoute');
const testimonialRoute = require('./router/testimonialRoute');
const portfolioRoute = require('./router/portfolioRoute')
router.use('/', userRoute);
router.use('/', categoryRoute);
router.use('/', contactRoute);
router.use('/', testimonialRoute);
router.use('/', portfolioRoute)

module.exports = router;