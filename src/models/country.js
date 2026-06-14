export default (sequelize, DataTypes) => {
  const country = sequelize.define("country", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  country.associate = (models) => {
    country.hasMany(models.state, {
      foreignKey: "country_id",
    });
  };

  return country;
};
