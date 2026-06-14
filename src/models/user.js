import bcrypt from 'bcrypt';
import { user_roles } from '../../utils/enums';
import { CONSTANT } from '../../utils/constants';

export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      values: Object.values(user_roles),
      allowNull: false,
    },
    profile_image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  /* <---------------- INSTANCE METHODS ----------------> */

  user.prototype.comparePassword = async function (plainTextPassword) {
    // bcrypt securely handles extracting the salt from the stored hash
    // and preventing timing attacks internally
    return bcrypt.compare(plainTextPassword, this.password_hash);
  };

  /* <---------------- HOOKS ----------------> */

  const hashPasswordHook = async (userRecord) => {
    // Only hash if the password is actually new or being changed
    if (userRecord.changed('password_hash')) {
      userRecord.password_hash = await bcrypt.hash(userRecord.password_hash, CONSTANT.SALT_ROUNDS);
    }
  };

  user.beforeCreate(hashPasswordHook);
  user.beforeUpdate(hashPasswordHook);

  /* <---------------- ASSOCIATIONS ----------------> */

  user.associate = (models) => {
    user.hasOne(models.seller, {
      foreignKey: 'user_id',
    });
  };

  return user;
};
