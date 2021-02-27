module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
