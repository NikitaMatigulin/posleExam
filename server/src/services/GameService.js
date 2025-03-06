const { Game } = require("../db/models");

class GameService {
  static async getAll() {
    const games = await Game.findAll({
      order: [["id", "ASC"]],
    });
    if (!games || games.length === 0) {
      throw new Error("No games found");
    }
    return games;
  }

  static async create(data) {
    const existingGame = await Game.findOne({ where: { title: data.title } });
    if (existingGame) {
      throw new Error("Game with this title already exists");
    }
    return await Game.create(data);
  }

  static async getById(id) {
    const game = await Game.findByPk(id);
    if (!game) {
      throw new Error("Game not found");
    }
    return game;
  }

  static async update(id, data) {
    const game = await Game.findByPk(id);
    if (!game) {
      throw new Error("Game not found");
    }

    if (data.title && data.title !== game.title) {
      const existingGame = await Game.findOne({ where: { title: data.title } });
      if (existingGame) {
        throw new Error("Game with this title already exists");
      }
    }

    return await game.update(data);
  }

  static async delete(id) {
    const game = await Game.findByPk(id);
    if (!game) {
      throw new Error("Game not found");
    }
    await game.destroy();
    return true;
  }
}

module.exports = GameService;
