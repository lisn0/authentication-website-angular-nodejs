const express = require('express');
const {createEvent, showEvents, showOneEvent, deleteEvent, updateEvent, showEventsByDate, showEventsByDateRange,
    sendEmail
} = require("../controllers/event.controller");
const router = express.Router();



/**
 * @swagger
 * /events/add:
 *   post:
 *     description: Add an event
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: eventTitle
 *         description: Title for the event
 *         in: formData
 *         required: true
 *         type: string
 *       - name: eventDescription
 *         description: Description for the event
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Add new Event
 */
router.post("/add", createEvent )

/**
 * @swagger
 * /events/list:
 *  get:
 *      description: Get all events.
 *      responses:
 *          200:
 *              description: events of this application.
 */
router.get("/list", showEvents )
router.get("/show/:id" , showOneEvent );
router.get("/show/week/:mydate" , showEventsByDateRange);
router.get("/show/date/:date" , showEventsByDate )
router.delete('/delete/:id', deleteEvent);
router.put("/update/:id" , updateEvent );
//router.get("/email", sendEmail );


module.exports = router;