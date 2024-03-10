const express = require('express');
const router = express.Router();
const personalQRController = require('../controllers/personalQRController');

// Define personal QR routes
router.get('/generate', personalQRController.showPersonalQRGeneration);
router.post('/generate', personalQRController.generatePersonalQR);
router.get('/scan/:id', personalQRController.scanPersonalQR);
router.get('/profile/:id', personalQRController.showProfile);
router.post('/edit/:id', personalQRController.editPersonalQR);
router.post('/search', personalQRController.searchPublicVcard);
router.get('/search', personalQRController.showPublicVcard);
router.post('/generateDynamic', personalQRController.generateDynamicQR);

module.exports = router;
