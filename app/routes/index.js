const express = require('express');
const router = express.Router();

/**
 * Default Page
 */
router.get('/', (req, res) => {
    res.status(200).render('../views/indexView.html')
});

module.exports = router;