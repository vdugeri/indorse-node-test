const passwordUtil = require('../utils/passwordUtil');


module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email_address: { type: DataTypes.STRING, required: true, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      remember_token: { type: DataTypes.STRING, allowNull: true },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false }

    },
    {
      underscored: true,
      tableName: 'users',
    },
  );

  User.beforeCreate((user, options) => {
    return passwordUtil.hashPassword(user.password).then(hashedPw => {
      user.password = hashedPw;
    }).catch(err => {
      //
    })
  });

  return User;
};
