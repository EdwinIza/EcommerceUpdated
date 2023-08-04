const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const usersRoute = require("./users");
const productsRoute = require("./products");
const ordersRoute = require("./orders");
const metricsRoute = require("./metrics");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/products", productsRoute);
router.use("/api/v1/orders", ordersRoute);
router.use("/api/v1/metrics", metricsRoute); // Corregido: usa "metricsRoute" en lugar de "ordersRoute" para el recurso de métricas

module.exports = router;
