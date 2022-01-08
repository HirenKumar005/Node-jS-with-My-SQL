const express = require('express');
const router = express();
const portfolio = require('../../controllers/portfolioController');
const { authenticate } = require('../../middleware/auth');
const { upload } = require('../../startup/multer');

router.post('/addPortfolio', authenticate, upload.array('profile', 12), portfolio.addportfolio);
router.get('/portfolio', authenticate, portfolio.data);
router.post('/updatePortfolio/:id', upload.array('profile', 12), authenticate, portfolio.updatePortfolio);
router.get('/deletePortfolio/:id', authenticate, portfolio.deletePortfolio)
module.exports = router;