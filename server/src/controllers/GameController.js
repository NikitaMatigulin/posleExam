const formatResponse = require("../utils/formatResponse");
const GameService = require("../services/GameService");
const isValidId = require("../utils/isValidId");
const reformatId = require("../utils/reformatId");
const GameValidator = require("../utils/GameValidator");

class GameController {
  static async getAll(req, res) {
    try {
      const games = await GameService.getAll();
      res.json(formatResponse(200, "Games fetched successfully", games));
    } catch ({ message }) {
      if (message === "No games found") {
        return res
          .status(404)
          .json(formatResponse(404, message, null, message));
      }
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal Server Error", null, message));
    }
  }

  static async create(req, res) {
    const { title, description, price, image, user_id } = req.body;
    const { isValid, error } = GameValidator.validate({
      title,
      description,
      price,
      image,
      user_id,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    if (!user_id) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "User ID is required",
            null,
            "User ID is required"
          )
        );
    }
    if (!isValidId(user_id)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid user ID", null, "Invalid user ID"));
    }
    const reformattedUserId = reformatId(user_id);
    if (!isValidId(reformattedUserId)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid user ID", null, "Invalid user ID"));
    }

    try {
      const game = await GameService.create({
        title,
        description,
        price,
        image,
        user_id: reformattedUserId,
      });
      res.json(formatResponse(201, "Game created successfully", game));
    } catch ({ message }) {
      if (message === "Game with this title already exists") {
        return res
          .status(400)
          .json(formatResponse(400, message, null, message));
      }
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal Server Error", null, message));
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(formatResponse(400, "ID is required", null, "ID is required"));
    }
    if (!isValidId(id)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid ID", null, "Invalid ID"));
    }
    const reformattedId = reformatId(id);
    if (!isValidId(reformattedId)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid ID", null, "Invalid ID"));
    }

    try {
      const game = await GameService.getById(reformattedId);
      res.json(formatResponse(200, "Game fetched successfully", game));
    } catch ({ message }) {
      if (message === "Game not found") {
        return res
          .status(404)
          .json(formatResponse(404, message, null, message));
      }
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal Server Error", null, message));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(formatResponse(400, "ID is required", null, "ID is required"));
    }
    if (!isValidId(id)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid ID", null, "Invalid ID"));
    }
    const reformattedId = reformatId(id);
    if (!isValidId(reformattedId)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid ID", null, "Invalid ID"));
    }

    const { title, description, price, image } = req.body;
    const { isValid, error } = GameValidator.validateUpdate({
      title,
      description,
      price,
      image,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      const game = await GameService.update(reformattedId, {
        title,
        description,
        price,
        image,
      });
      res.json(formatResponse(200, "Game updated successfully", game));
    } catch ({ message }) {
      if (message === "Game not found") {
        return res
          .status(404)
          .json(formatResponse(404, message, null, message));
      }
      if (message === "Game with this title already exists") {
        return res
          .status(400)
          .json(formatResponse(400, message, null, message));
      }
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal Server Error", null, message));
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(formatResponse(400, "ID is required", null, "ID is required"));
    }
    if (!isValidId(id)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid ID", null, "Invalid ID"));
    }
    const reformattedId = reformatId(id);
    if (!isValidId(reformattedId)) {
      return res
        .status(400)
        .json(formatResponse(400, "Invalid ID", null, "Invalid ID"));
    }

    try {
      await GameService.delete(reformattedId);
      res.json(formatResponse(200, "Game deleted successfully", null));
    } catch ({ message }) {
      if (message === "Game not found") {
        return res
          .status(404)
          .json(formatResponse(404, message, null, message));
      }
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal Server Error", null, message));
    }
  }
}

module.exports = GameController;
