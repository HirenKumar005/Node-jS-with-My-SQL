const express = require('express');
const router = express();
const category = require('../../controllers/categoryController');
const { authenticate } = require('../../middleware/auth');

router.post('/addCategory', authenticate, category.addCategory);
router.get('/category', authenticate, category.data);
router.post('/updateCategory/:id', authenticate, category.updateCategory);
router.get('/deleteCategory/:id', authenticate, category.deleteCategory);
module.exports = router;