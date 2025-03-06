"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Game.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      image: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
