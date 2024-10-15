const express = require('express');
const router = express.Router();

/**
 * Default Page
 */
router.get('/', (req, res) => {
    res.status(200).send('Welcome to NASA Simple API Integration');
});

module.exports = router;