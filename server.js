const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerConfig")

const admin = require('firebase-admin');
const firebaseConfig = require("./data/db_config.json")

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://bardly-test.firebaseio.com',
});
const appointmentRoutes = require("./routes/appointments")
const staffRoutes = require("./routes/staff")

const app = express();

// Allow for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Appointments routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/staffs", staffRoutes);

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
