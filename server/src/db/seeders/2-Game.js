const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!users.length) {
      throw new Error("Users not found. Run users seed first");
    }

    return queryInterface.bulkInsert("Games", [
      {
        title: "The Witcher 3",
        description: "Эпическая RPG игра с открытым миром",
        price: 29.99,
        image: "witcher3.jpg",
        user_id: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Red Dead Redemption 2",
        description: "Великолепная игра про Дикий Запад",
        price: 39.99,
        image: "rdr2.jpg",
        user_id: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cyberpunk 2077",
        description: "Футуристическая RPG в мире киберпанка",
        price: 49.99,
        image: "cyberpunk.jpg",
        user_id: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Elden Ring",
        description: "Новая игра от создателей Dark Souls",
        price: 59.99,
        image: "eldenring.jpg",
        user_id: users[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "God of War Ragnarök",
        description: "Продолжение эпической истории Кратоса",
        price: 69.99,
        image: "gow.jpg",
        user_id: users[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Games", null, {});
  },
};
