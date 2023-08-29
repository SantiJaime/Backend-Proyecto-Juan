const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  pass: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  idCart: {
    type: String,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, pass, ...user } = this.toObject();
  return user;
};

const UserModel = model("user", UserSchema);

module.exports = UserModel;
