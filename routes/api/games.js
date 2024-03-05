const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const Game = require('../../models/game');

// All paths start with '/api/games'

// POST /api/games (create a user - sign up)
router.post('/', gamesCtrl.create);
router.get('/', gamesCtrl.getAll)


module.exports = router;