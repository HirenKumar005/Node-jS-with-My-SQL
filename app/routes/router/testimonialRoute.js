const express = require('express');
const router = express();
const testimonial = require('../../controllers/testimonialController');
const { authenticate } = require('../../middleware/auth');
const { upload } = require('../../startup/multer');

router.post('/addTestimonial', authenticate, upload.single('profile'), testimonial.addtestimonial);
router.get('/testimonial', authenticate, testimonial.data);
router.post('/updateTestimonial/:id', authenticate, upload.single('profile'), testimonial.updateTestimonial);
router.get('/deleteTestimonial/:id', authenticate, testimonial.deleteTestimonial);
module.exports = router;