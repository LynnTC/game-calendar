const express = require('express');
const router = express.Router();

const GAMEAPIKEY = process.env.GAMEAPIKEY;


router.get('/', (req, res) => {
    try {
      if (!GAMEAPIKEY) {
        throw new Error('API key is not available');
      }
  
      res.json({ apiKey: GAMEAPIKEY });
    } catch (error) {
      console.error('Error fetching API key:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;