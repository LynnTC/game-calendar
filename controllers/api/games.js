const Game = require ('../../models/game');

module.exports = {
    create,
    delete: destroyGame,
    addToUserCal,
    getAll,
    getById,
};


async function create(req, res){
    req.body.user = req.user._id
    const game = await Game.create(req.body)
    res.json(game)
}

async function addToUserCal(req, res){
    const gameData = {
        user: req.user._id,
        name: req.body.name,
        releaseDate: req.body.released,
        background: {
            url: req.body.background_image
        },
    }
    const game = await Game.findOneAndUpdate(
        {user: gameData.user, name: gameData.name},
        gameData,
        {upsert: true, new: true}
    )
    res.json(game)
}

async function getAll(req, res) {
    const game = await Game.find({
      user: req.user._id,
    });
    res.json(game);
  }

async function getById(req, res){
    const game = await Game.findById(req.params.gameId);
    res.json(game);
}

async function destroyGame(req, res){
    const game = await Game.findByIdAndRemove(req.params.gameId);
    console.log('Game ID to delete:', req.params.gameId);
    res.json(game);
}