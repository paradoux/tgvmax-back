const express = require("express")
const ctrlTrains = require("../controllers/trains")

const router = new express.Router()

// Trains routes
router.get("/trains/:city/:outwardDate?/:returnDate?", ctrlTrains.trainsReadAll)

//Handle non existant routes
router.use("/*", res => {
  res.status(404)
  res.json({error: "API endpoint not found"})
})

module.exports = router
