const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/games'

// POST /api/games (create a user - sign up)
router.post('/', gamesCtrl.create);

module.exports = router;