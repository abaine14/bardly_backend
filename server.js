const express = require("express");
const cors = require("cors");
const path = require("path");

const appointmentRoutes = require("./routes/appointments")

const app = express();

// Allow for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/appointments", appointmentRoutes);

// This can be used for sending files if necessary
// app.use("/image/:id", async (req, res) => {
//   const filePath = path.join(
//     __dirname,
//     `images/${req.params.folder}/`
//   );
//   res.sendFile(filePath);
// });

app.listen(8088, () => {
  console.log("server is listening on port 8088");
});
