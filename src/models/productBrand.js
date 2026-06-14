export default (sequelize, DataTypes) => {
  const product_brand = sequelize.define(
    'product_brand',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['product_id', 'brand_id'],
          name: 'product_brand_unique_link',
        },
      ],
    },
  );

  product_brand.associate = (models) => {
    product_brand.belongsTo(models.product, {
      foreignKey: 'product_id',
    });
    product_brand.belongsTo(models.brand, {
      foreignKey: 'brand_id',
    });
  };

  return product_brand;
};
