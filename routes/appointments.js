const routes = require("express").Router();
const appointmentMethods = require("../methods/appointmentMethods");
const { firestore } = require("firebase-admin")

const db = firestore();
const appointments_collection = db.collection("Appointments");

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         appointmentStartTime:
 *           type: string
 *           format: time
 *           description: Start time of the appointment
 *         appointmentEndTime:
 *           type: string
 *           format: time
 *           description: End time of the appointment
 *         appointmentDate:
 *           type: string
 *           format: date
 *           description: Date of the appointment
 *         appointmentReasons:
 *           type: array
 *           items:
 *             type: string
 *           description: Reasons for the appointment
 *         appointmentComments:
 *           type: array
 *           items:
 *             type: string
 *           description: Comments related to the appointment
 *         avatarUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: Avatar URL for the customer
 *         hasDocumentsToFill:
 *           type: boolean
 *           description: Indicates if there are documents to fill
 *         customerDocuments:
 *           type: array
 *           items:
 *             type: string
 *           description: List of customer documents
 *         customerFirstName:
 *           type: string
 *           description: First name of the customer
 *         customerLastName:
 *           type: string
 *           description: Last name of the customer
 *         customerId:
 *           type: string
 *           description: Unique ID of the customer
 *         customerPhoneNumber:
 *           type: string
 *           description: Phone number of the customer
 *         customerEmail:
 *           type: string
 *           format: email
 *           description: Email address of the customer
 *
 * /api/appointments/mocklist/{userAmount}:
 *   get:
 *     summary: Get all appointments
 *     parameters:
 *       - in: path
 *         name: userAmount
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */
routes.get("/mockList/:userAmount", async (req, res) => {
  res.json(appointmentMethods.mockAppointmentsList(req.params.userAmount));
});

// Testing out appointment CRUD operations

/**
 * @swagger
 * /api/appointments/all:
 *   get:
 *     summary: Retrieve all appointments
 *     description: Fetches all appointments from the database without pagination.
 *     responses:
 *       200:
 *         description: A list of all appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the appointment.
 *                   appointmentStartTime:
 *                     type: string
 *                     format: time
 *                     description: Start time of the appointment.
 *                   appointmentEndTime:
 *                     type: string
 *                     format: time
 *                     description: End time of the appointment.
 *                   appointmentDate:
 *                     type: string
 *                     format: date
 *                     description: Date of the appointment.
 *                   appointmentReasons:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Reasons for the appointment.
 *                   appointmentComments:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Comments related to the appointment.
 *                   avatarUrl:
 *                     type: string
 *                     format: uri
 *                     nullable: true
 *                     description: Avatar URL of the customer.
 *                   hasDocumentsToFill:
 *                     type: boolean
 *                     description: Indicates if there are documents to fill.
 *                   customerDocuments:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Documents associated with the customer.
 *                   customerFirstName:
 *                     type: string
 *                     description: First name of the customer.
 *                   customerLastName:
 *                     type: string
 *                     description: Last name of the customer.
 *                   customerId:
 *                     type: string
 *                     description: Unique ID of the customer.
 *                   customerPhoneNumber:
 *                     type: string
 *                     description: Phone number of the customer.
 *                   customerEmail:
 *                     type: string
 *                     format: email
 *                     description: Email address of the customer.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing the issue.
 */
routes.get('/all', async (req, res) => {
  try {
    const snapshot = await appointments_collection.get();
    const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     description: Fetches an appointment document from the database using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the appointment to retrieve.
 *     responses:
 *       200:
 *         description: Appointment found and returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the appointment.
 *                 appointmentStartTime:
 *                   type: string
 *                   description: The start time of the appointment.
 *                 appointmentEndTime:
 *                   type: string
 *                   description: The end time of the appointment.
 *                 appointmentDate:
 *                   type: string
 *                   description: The date of the appointment.
 *                 customerFirstName:
 *                   type: string
 *                   description: First name of the customer.
 *                 customerLastName:
 *                   type: string
 *                   description: Last name of the customer.
 *       404:
 *         description: Appointment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Appointment was not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing what went wrong.
 */
routes.get("/:id", async(req,res)=>{
  try {
    const { id } = req.params.id;
    const doc = await appointment_collection.doc(id).get()

    if(!doc.exists){
      return res.status(404).json({
        error:"Appointment was not found"
      })
    }

    res.status(200).json({
      id:id, ...doc.data()
    })

  } catch(err){
    res.status(500).json({
      error: err.message
    })
  }
})

/**
 * @swagger
 * /api/appointments/create-appointment:
 *   post:
 *     summary: Create a new appointment
 *     description: Creates a new appointment document in the database and returns the created appointment along with its ID.
 *     requestBody:
 *       description: Appointment data to be created. (Currently mocked for demonstration purposes.)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentStartTime:
 *                 type: string
 *                 format: time
 *                 description: Start time of the appointment.
 *               appointmentEndTime:
 *                 type: string
 *                 format: time
 *                 description: End time of the appointment.
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the appointment.
 *               appointmentReasons:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Reasons for the appointment.
 *               appointmentComments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Comments related to the appointment.
 *               avatarUrl:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: Avatar URL of the customer.
 *               hasDocumentsToFill:
 *                 type: boolean
 *                 description: Indicates if there are documents to fill.
 *               customerDocuments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Documents associated with the customer.
 *               customerFirstName:
 *                 type: string
 *                 description: First name of the customer.
 *               customerLastName:
 *                 type: string
 *                 description: Last name of the customer.
 *               customerId:
 *                 type: string
 *                 description: Unique ID of the customer.
 *               customerPhoneNumber:
 *                 type: string
 *                 description: Phone number of the customer.
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 description: Email address of the customer.
 *     responses:
 *       201:
 *         description: Appointment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created appointment.
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 appointment:
 *                   type: object
 *                   description: Details of the created appointment.
 *                   $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing the issue.
 */

// TODO Add appointment status
routes.post("/create-appointment", async (req, res) => {
  const { appopintmentToAdd } = req.body
  try {
    const newAppointment = appointmentMethods.mockAppointmentsList(1).all_appointments[0]; //req.body
    const docRef = await appointments_collection.add(newAppointment);
    res.status(201).json({
      id: docRef.id,
      message: 'Appointment created successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment by ID
 *     description: Updates an existing appointment in the database using the provided ID and new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the appointment to update.
 *     requestBody:
 *       description: Data to update the appointment.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentStartTime:
 *                 type: string
 *                 format: time
 *                 description: Updated start time of the appointment.
 *               appointmentEndTime:
 *                 type: string
 *                 format: time
 *                 description: Updated end time of the appointment.
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 description: Updated date of the appointment.
 *               appointmentReasons:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated reasons for the appointment.
 *               appointmentComments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated comments related to the appointment.
 *               avatarUrl:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: Updated avatar URL of the customer.
 *               hasDocumentsToFill:
 *                 type: boolean
 *                 description: Updated documents to fill indicator.
 *               customerDocuments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated documents associated with the customer.
 *               customerFirstName:
 *                 type: string
 *                 description: Updated first name of the customer.
 *               customerLastName:
 *                 type: string
 *                 description: Updated last name of the customer.
 *               customerId:
 *                 type: string
 *                 description: Updated unique ID of the customer.
 *               customerPhoneNumber:
 *                 type: string
 *                 description: Updated phone number of the customer.
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 description: Updated email address of the customer.
 *     responses:
 *       200:
 *         description: Appointment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       404:
 *         description: Appointment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Appointment not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing the issue.
 */
routes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const docRef = appointments_collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await docRef.update(updatedData);
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     description: Deletes an appointment from the database using the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the appointment to delete.
 *     responses:
 *       200:
 *         description: Appointment deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       404:
 *         description: Appointment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Appointment not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing the issue.
 */
routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const docRef = appointments_collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await docRef.delete();
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = routes;
