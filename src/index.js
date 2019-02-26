const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes/routes")

const {port, host} = require("./config")

//Allows CORS
app.use(cors())

app.get("/", function(req, res) {
  res.send("Launch success !")
})

// Express router
app.use("/api", routes)

// Error handler
app.use("*", (err, req, res, next) => {
  res.json({err})
  next()
})

// Start listening
if (port) {
  app.listen(port, host, err => {
    const url = `http://${host}:${port}`

    if (err) console.error(`Error: ${err}`)

    console.info(`Listening at ${url}`)
  })
} else {
  console.error("Error! No PORT environment variable specified.")
}
