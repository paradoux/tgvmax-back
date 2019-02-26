const axios = require("axios")

const {
  sortTrains,
  formatData,
  gatherCities,
  mergeOutwardsAndReturns,
  apiUrlFormater
} = require("../utils")

module.exports.trainsReadAll = async (req, res, next) => {
  try {
    const {city, outwardDate, returnDate} = req.params

    const outwardTrains = sortTrains(
      formatData(await getTrains(apiUrlFormater(city, outwardDate, "outward")))
    )

    const returnTrains = sortTrains(
      formatData(await getTrains(apiUrlFormater(city, returnDate, "return")))
    )

    // Need to merge the two with same Cities
    const trains = [
      mergeOutwardsAndReturns(
        gatherCities(outwardTrains, "outward", "destination"),
        gatherCities(returnTrains, "return", "origine")
      )
    ]

    res.json({trains})

    console.log("The request is a success !")
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const getTrains = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url
    })
      .then(res => {
        resolve(res.data.records)
      })
      .catch(err => {
        const error = new Error()
        error.message = "Error when retrieving trains from SNCF API"
        error.status = 500
        reject(error)
      })
  })
}
