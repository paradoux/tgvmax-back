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

    /* The user can add a departure date or not, we change the request url accordingly */

    // console.log("outwardDate", outwardDate)
    /* We wait for the response of the SNCF API and we sort the results */
    // const outwardsTrainsToBeSorted = await axios.get(url)

    // const returnsTrainsToBeSorted = await axios.get(
    //   `${ROOT_URL}&refine.date=${returnDate}&refine.destination=${city}${tgvmaxdispo}`
    // )

    // const outwardsTrainsToReturn = gatherCities(
    //   formatData(sortTrains(outwardsTrainsToBeSorted)),
    //   "destination"
    // )

    // const returnsTrainsToReturn = gatherCities(
    //   formatData(sortTrains(returnsTrainsToBeSorted)),
    //   "origine"
    // )

    // const results = mergeOutwardsAndReturns(
    //   outwardsTrainsToReturn,
    //   returnsTrainsToReturn
    // )

    // res.json(results)
    // if (hour) {
    //     console.log('Hey', hour)
    //     trains = utils.filterTrains(trains, hour)
    //     // console.log('filtered trains', trains)
    //     res.json(trains)

    // } else {
    //     res.json(trains)
    // }
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
