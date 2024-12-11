const routes = require("express").Router();
const staffMethods = require("../methods/staffMethods");

routes.get("/mockList/:staffs", async (req, res) => {
  res.json(staffMethods.mockStaffList(req.params.staffs));
});

module.exports = routes;