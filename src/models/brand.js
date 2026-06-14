export default (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    usesr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      foreignKey: 'usesr_id',
    });
    brand.belongsTo(models.product, {
      foreignKey: 'product_id',
    });
  };

  return brand;
};
