module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "topic",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
