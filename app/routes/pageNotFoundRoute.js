const express = require('express');
const router = express.Router();

/**
 * Not Found Page
 */
router.all('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

module.exports = router
