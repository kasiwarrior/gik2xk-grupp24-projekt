module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: [4, 200],
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [8, 100]
        },
      },
      firstName: {
        type: DataTypes.STRING(100),
      },
      lastName: {
        type: DataTypes.STRING(100),
      },
      imageURL: {
        type: DataTypes.STRING(255),
        validate: {
            isURL: true
        }
      }
    },
    { underscored: true },
  );
};
