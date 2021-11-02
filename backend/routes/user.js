const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    console.log('user api')
});

module.exports = router;