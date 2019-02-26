module.exports.sortTrains = trains => {
  return trains.sort((a, b) => {
    let houra = a.heure_depart // Style:"08:35"
    let hourb = b.heure_depart
    const datea = a.date // Style: "2018-08-28"
    const dateb = b.date
    /* We turn each departure into a date+hour figure and we compare each one to sort all of them  */
    if (houra.length < 5) {
      houra = houra.split("")
      houra.unshift("0")
      houra = houra.join("")
    } // Departure hours under 10 are in one digit so we convert them into two digits numbers
    if (hourb.length < 5) {
      hourb = hourb.split("")
      hourb.unshift("0")
      hourb = hourb.join("")
    }
    a = datea.replace(/-/g, "").concat(houra.replace(/:/g, "")) // We erase the "-" between the date's figures
    b = dateb.replace(/-/g, "").concat(hourb.replace(/:/g, ""))
    return a - b // We sort them from lower to higher number, meaning from sooner to later trains
  })
}

module.exports.filterTrains = (trains, hour) => {
  const filteredTrains = trains.filter(train => {
    let heure = train.fields.heure_depart
    if (heure.length < 5) {
      heure = heure.split("")
      heure.unshift("0")
      heure = heure.join("")
    }
    heure = heure.replace(/:/g, "")
    hour = parseInt(hour, 10)
    return heure > hour
  })

  console.log(filteredTrains)
  return filteredTrains
}

module.exports.formatData = trains => {
  console.log("trains", trains)
  return trains.map(train => ({
    heure_depart: train.fields.heure_depart,
    heure_arrivee: train.fields.heure_arrivee,
    date: train.fields.date,
    destination: train.fields.destination,
    origine: train.fields.origine
  }))
}

module.exports.gatherCities = (trains, criteria) => {
  const gatheredTrains = {}

  trains.forEach(train => {
    if (Object.keys(gatheredTrains).includes(train.origin)) {
      gatheredTrains[train[origin]][criteria] = {
        ...gatheredTrains[train[origin]][criteria],
        train
      }
    } else {
      gatheredTrains[train[origin]][criteria] = {
        train
      }
    }
  })
}

module.exports.mergeOutwardsAndReturns = (outwards, returns) => {
  const results = {}

  const outwardsCities = Object.keys(outwards)
  const returnCities = Object.keys(returns)

  outwardsCities.forEach(city => {
    if (returnCities.includes(city)) {
      results[city] = {...outwards[city], ...returns[city]}
    }
  })

  return results
}

module.exports.apiUrlFormater = (city, date, direction) => {
  let url
  const ROOT_URL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=tgvmax%40datasncf&start=0&rows=10000&facet=date&facet=destination&facet=origine`
  const tgvmaxdispo = `&exclude.od_happy_card=NON`

  if (direction === "outward") {
    date
      ? (url = `${ROOT_URL}&refine.date=${dateFormater(
          date
        )}&refine.origine=${city}${tgvmaxdispo}`)
      : (url = `${ROOT_URL}&refine.origine=${city}${tgvmaxdispo}`)
  } else if (direction === "return") {
    date
      ? (url = `${ROOT_URL}&refine.date=${dateFormater(
          date
        )}&refine.destination=${city}${tgvmaxdispo}`)
      : (url = `${ROOT_URL}&refine.destination=${city}${tgvmaxdispo}`)
  }

  return url
}

const dateFormater = date => {
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)
  return `${year}%2F${month}%2F${day}`
}

module.exports.gatherCities = (trains, direction, field) => {
  let gatheredTrains = {}

  trains.forEach(train => {
    if (Object.keys(gatheredTrains).includes(train[field])) {
      gatheredTrains[train[field]][direction] = [
        ...gatheredTrains[train[field]][direction],
        train
      ]
    } else {
      gatheredTrains[train[field]] = {[direction]: [train]}
    }
  })

  return gatheredTrains
}
