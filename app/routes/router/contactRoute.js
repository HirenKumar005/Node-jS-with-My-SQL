const express = require('express');
const router = express();
const contact = require('../../controllers/contactController');
const { authenticate } = require('../../middleware/auth');


router.post('/addContact', authenticate, contact.addContact);
router.get('/contact', authenticate, contact.data);
router.post('/updateContact/:id', authenticate, contact.updateContact);
router.get('/deleteContact/:id', authenticate, contact.deleteContact);

module.exports = router;