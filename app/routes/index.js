const express = require('express');
const router = express.Router();

/**
 * Default Page
 */
router.get('/', (req, res) => {
    res.status(200).send('Welcome to NASA Simple API Integration');
});

/**
 * Not Found Page
 */
router.get('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

module.exports = router;