const trains = [
  {
    heure_depart: "9:02",
    heure_arrivee: "9:27",
    date: "2019-03-11",
    destination: "AIX EN PROVENCE TGV",
    origine: "AVIGNON TGV"
  },
  {
    heure_depart: "9:02",
    heure_arrivee: "9:42",
    date: "2019-03-11",
    destination: "MARSEILLE ST CHARLES",
    origine: "AVIGNON TGV"
  },
  {
    heure_depart: "9:18",
    heure_arrivee: "9:53",
    date: "2019-03-11",
    destination: "MARSEILLE ST CHARLES",
    origine: "AVIGNON TGV"
  }
]

gatherCities = (trains, direction) => {
  let gatheredTrains = {}

  trains.forEach(train => {
    if (Object.keys(gatheredTrains).includes(train.destination)) {
      gatheredTrains[train.destination][direction] = [
        ...gatheredTrains[train.destination][direction],
        train
      ]
    } else {
      gatheredTrains[train.destination] = {[direction]: [train]}
    }
  })

  return gatheredTrains
}

console.log(gatherCities(trains, "outwards"))

// console.log(gatheredTrains[train[origin]]["outwards"])

// } else if (Object.keys(gatheredTrains).includes(train.destination)) {
//   gatheredTrains[train[destination]]["return"] = {
//     ...gatheredTrains[train[destination]]["return"],
//     train
//   }
// }
