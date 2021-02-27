module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "author",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      major: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
