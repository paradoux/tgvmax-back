const express = require('express');
const axios = require('axios')
let trainsRouter = express.Router();

trainsRouter.get('/:city/:date', async (req, res) => {
    var url;
    const ROOT_URL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=tgvmax%40datasncf&start=0&rows=10000&facet=date&facet=destination&facet=origine`
    var { city } = req.params
    var { date } = req.params
    const tgvmaxdispo = "&exclude.od_happy_card=NON"
    if (date === "null") {
        url = `${ROOT_URL}&refine.origine=${city}${tgvmaxdispo}`
    }
    else {
        let year = date.slice(0, 4)
        let month = date.slice(5, 7)
        let day = date.slice(8, 10)
        date = `${year}%2F${month}%2F${day}`
        url = `${ROOT_URL}&refine.date=${date}&refine.origine=${city}${tgvmaxdispo}`
    }
    try {
        let trains = await axios.get(url)
        trains = trains.data.records.sort((a, b) => {
            let departurea = a.fields.heure_depart;
            let departureb = b.fields.heure_depart;
            let datea = a.fields.date;
            let dateb = b.fields.date;
            if (departurea.length < 5) { departurea = departurea.split(""); departurea.unshift("0"); departurea = departurea.join(''); }
            if (departureb.length < 5) { departureb = departureb.split(""); departureb.unshift("0"); departureb = departureb.join(''); }
            a = datea.replace(/-/g, "").concat(departurea.replace(/:/g, ''));
            b = dateb.replace(/-/g, "").concat(departureb.replace(/:/g, ''));
            return a - b;
        });
        console.log("The request is a success !")
        res.json(trains.slice(0, 200))
    }
    catch (err) {
        console.error(err)
    }
})



module.exports.trainsRouter = trainsRouter;
