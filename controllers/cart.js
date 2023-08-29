const CartModel = require("../models/cart");
const ServiceModel = require("../models/service");

const getCartServices = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.id });
    res.status(200).json({ cart });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo encontrar los productos del carrito" });
  }
};

const addServiceCart = async (req, res) => {
  try {
    const { idCart, idServ } = req.params;

    const serviceArray = [];

    const cart = await CartModel.findOne({ _id: idCart });
    const service = await ServiceModel.findOne({ _id: idServ });

    cart.services.forEach((serv) => {
      if (serv._id == idServ) serviceArray.push(serv);
    });
    if (serviceArray.length > 0)
      return res
        .status(400)
        .json({ msg: "El servicio ya existe en el carrito" });

    cart.services.push(service);
    await cart.save();

    res
      .status(200)
      .json({ msg: "Servicio cargado correctamente al carrito", cart });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo agregar el servicio al carrito", error });
  }
};
const deleteServiceCart = async (req, res) => {
  try {
    const { idCart, idServ } = req.params;

    const cart = await CartModel.findOne({ _id: idCart });

    const index = cart.services.findIndex((serv) => serv._id == idServ);

    if (index === -1)
      return res
        .status(400)
        .json({ msg: "El servicio no existe en el carrito" });

    cart.services.splice(index, 1);
    await cart.save();

    res
      .status(200)
      .json({ msg: "Servicio eliminado correctamente del carrito" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo eliminar el servicio del carrito", error });
  }
};

module.exports = {
  getCartServices,
  addServiceCart,
  deleteServiceCart,
};
