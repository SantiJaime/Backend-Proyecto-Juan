const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  logIn,
} = require("../controllers/users");
const auth = require("../middleware/auth");

router.get("/", auth("admin"), getAllUsers);
router.get(
  "/:id",
  [check("id", "Formato ID inválido").isMongoId()],
  getOneUser
);
router.post(
  "/",
  [
    check("email", "Formato Email inválido").isEmail(),
    check("email", "El campo Email está vacío").notEmpty(),
    check("username", "El campo Username está vacío").notEmpty(),
    check(
      "username",
      "Campo Username: mínimo de 3 caracteres | Máximo de 20 caracteres"
    ).isLength({ min: 3, max: 20 }),
    check("pass", "El campo contraseña está vacío").notEmpty(),
    check("pass", "Campo contraseña: mínimo de 8 carácteres").isLength({
      min: 8,
    }),
  ],
  createUser
);
router.put(
  "/:id", auth("admin"),
  [
    check("id", "Formato ID inválido").isMongoId(),
    check("email", "Formato Email inválido").isEmail(),
    check("email", "El campo Email está vacío").notEmpty(),
    check("username", "El campo Username está vacío").notEmpty(),
    check(
      "username",
      "Campo Username: mínimo de 3 caracteres | Máximo de 20 caracteres"
    ).isLength({ min: 3, max: 20 }),
    check("pass", "El campo Contraseña está vacío").notEmpty(),
    check("pass", "Campo Contraseña: mínimo de 8 carácteres").isLength({
      min: 8,
    }),
  ],
  updateUser
);
router.delete(
  "/:id", auth("admin"),
  [check("id", "Formato ID inválido").isMongoId()],
  deleteUser
);
router.post("/login", [
    check("email", "El campo Email está vacío").notEmpty(),
    check("pass", "El campo Contraseña está vacío").notEmpty()
], logIn)
module.exports = router;
