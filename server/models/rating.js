module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ratings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      password: {
        type: DataTypes.DOUBLE,
        validate: {
          allowNull: false,
        },
      },
    },
    { underscored: true },
  );
};
