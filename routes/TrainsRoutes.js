const express = require("express")

const trainsRouter = express.Router()

const ctrlTrains = require("../controllers/trains")

/* Utilisation of the SNCF (French railroad company) API */
/* Problem: The data is not sorted by departure dates and hours */
/* Solution: Create a Node.js server proxy that get all the trains unordered, sort them and send them to a React.js app  */

trainsRouter.get("/:city/:outwardDate?/:returnDate?", ctrlTrains.trainsReadAll)

module.exports.trainsRouter = trainsRouter
