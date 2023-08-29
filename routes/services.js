const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllServices,
  getOneService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/services");
const auth = require("../middleware/auth");


router.get("/", getAllServices);
router.get("/:id", auth("user" || "admin"), [
    check("id", "Formato ID incorrecto").isMongoId()
], getOneService);
router.post("/", auth("admin"), [
    check("nombre", "Campo nombre vacío").notEmpty(),
    check("descripcion", "Campo descripción vacío").notEmpty(),
    check("img", "Campo imagen vacío").notEmpty()
], createService);
router.put("/:id", auth("admin"), [
    check("id", "Formato ID incorrecto").isMongoId(),
    check("nombre", "Campo nombre vacío").notEmpty(),
    check("descripcion", "Campo descripción vacío").notEmpty(),
    check("img", "Campo imagen vacío").notEmpty()
], updateService);
router.delete("/:id", auth("admin"), [
    check("id", "Formato ID incorrecto").isMongoId()
], deleteService);

module.exports = router