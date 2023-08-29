const ServiceModel = require("../models/service");
const { validationResult } = require("express-validator");

const getAllServices = async (req, res) => {
  try {
    const allServices = await ServiceModel.find();

    res.status(200).json({ msg: "Todos los servicios", allServices });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar los servicios", error });
  }
};
const getOneService = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const oneService = await ServiceModel.findOne({ _id: req.params.id });

    res.status(200).json({ msg: "Servicio encontrado", oneService });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar el servicio", error });
  }
};
const createService = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req

    const newService = new ServiceModel(body);
    await newService.save();

    res.status(201).json({ msg: "Servicio creado correctamente", newService });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el servicio", error });
  }
};
const updateService = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req

    const updatedService = await ServiceModel.findByIdAndUpdate(
      { _id: req.params.id },
      body,
      { new: true }
    );

    res
      .status(200)
      .json({ msg: "Servicio editado correctamente", updatedService });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo editar el servicio", error });
  }
};
const deleteService = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await ServiceModel.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({ msg: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el servicio" });
  }
};

module.exports = {
  getAllServices,
  getOneService,
  createService,
  updateService,
  deleteService,
};
