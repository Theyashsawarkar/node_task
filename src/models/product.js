module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  product.associate = (models) => {
    product.belongsTo(models.seller, {
      foreignKey: "seller_id",
    });
    product.hasMany(models.brand, {
      foreignKey: "product_id",
    });
  };

  return product;
};
