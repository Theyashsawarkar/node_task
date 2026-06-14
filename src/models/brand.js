export default (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  brand.associate = (models) => {
    brand.belongsTo(models.user, {
      foreignKey: 'user_id',
    });

    brand.belongsToMany(models.product, {
      through: models.product_brand,
      foreignKey: 'brand_id',
      otherKey: 'product_id',
    });
  };

  return brand;
};
