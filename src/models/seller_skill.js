export default (sequelize, DataTypes) => {
  const seller_skills = sequelize.define("seller_skills", {
    seller_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    skill_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return seller_skills;
};
