export default (sequelize, DataTypes) => {
  const seller = sequelize.define("seller", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  seller.associate = (models) => {
    seller.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    seller.hasMany(models.product, {
      foreignKey: "seller_id",
    });
    seller.belongsToMany(models.skill, {
      through: "seller_skills",
      foreignKey: "seller_id",
    });
  };

  return seller;
};
