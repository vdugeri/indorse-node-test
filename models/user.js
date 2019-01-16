const passwordUtil = require('../utils/passwordUtil');
const emailUtils = require('../utils/emailUtils');


module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: { type: DataTypes.STRING },
      last_name: { type: DataTypes.STRING },
      email_address: { type: DataTypes.STRING, required: true, unique: true },
      password: { type: DataTypes.STRING },
    },
    {
      underscored: true,
      tableName: 'users',
    },
  );

  User.prototype.toJson = () => {
    const value = this.get();
    delete value.password;

    return value;
  }

  User.prototype.matchPasswords = (candidatePassword, hash) => {
    return passwordUtils.matchPassword(candidatePassword, hash);
  }

  User.beforeCreate((user, options) => {
      return passwordUtil.hashPassword(user.password).then(hashedPw => {
          user.password = hashedPw;
      }).catch(err => {
          console.log(err);
      })
  });

  User.afterCreate((user, options) => {
      return emailUtils.sendConfirmationEmail(user);
  });

  return User;
};
