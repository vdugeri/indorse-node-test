const bcrypt = require('bcrypt');

const ROUNDS = 10;

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
      instanceMethods: {
        toJson() {
          const value = this.get();
          delete value.password;

          return value;
        },
        matchPasswords(candidatePassword, hash) {
          return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, hash, (err, matched) => {
              if (!err) {
                return resolve(matched);
              }

              return reject(err);
            });
          });
        },
      },
    },
  );

  User.beforeCreate((user, options, next) => {
    bcrypt.genSalt(ROUNDS, (err, salt) => {
      if (!err) {
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (err) {
            return next(error);
          }
          user.password = hash;
          return next();
        });
      }
    });
  });

  return User;
};
