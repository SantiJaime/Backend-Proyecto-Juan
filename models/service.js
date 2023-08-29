const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  cantidad: {
    type: Number,
    default: 1,
  },
});

ServiceSchema.methods.toJSON = function () {
  const { __v, ...service } = this.toObject();
  return service;
};

const ServiceModel = model("service", ServiceSchema);

module.exports = ServiceModel;
