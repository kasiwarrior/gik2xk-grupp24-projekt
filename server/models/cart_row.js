module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {}, {undscored: true});};