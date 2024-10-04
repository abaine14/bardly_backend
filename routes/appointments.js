const routes = require("express").Router();
const appointmentMethods = require("../methods/appointmentMethods");

routes.get("/mockList/:userAmount", async (req, res) => {
  res.json(appointmentMethods.mockAppointmentsList(req.params.userAmount));
});

module.exports = routes;
