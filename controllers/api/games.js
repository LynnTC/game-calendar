const Game = require ('../../models/game');

module.exports = {
    create,
    delete: destroyGame,
};


async function create(req, res){
    req.body.user = req.user._id
    const game = await Game.create(req.body)
    res.json(game)
}

async function destroyGame(req, res){
    console.log(hi)
}