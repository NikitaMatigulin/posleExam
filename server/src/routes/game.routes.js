const gameRoutes = require("express").Router();
const GameController = require("../controllers/GameController");

gameRoutes.get("/", GameController.getAll);
gameRoutes.post("/", GameController.create);
gameRoutes.get("/:id", GameController.getById);
gameRoutes.put("/:id", GameController.update);
gameRoutes.delete("/:id", GameController.delete);

module.exports = gameRoutes;
