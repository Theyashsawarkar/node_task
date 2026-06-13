export default (sequelize, DataTypes) => {
  const skill = sequelize.define("skill", {
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

  skill.associate = (models) => {
    skill.belongsToMany(models.seller, {
      through: "seller_skills",
      foreignKey: "skill_id",
    });
  };

  return skill;
};
