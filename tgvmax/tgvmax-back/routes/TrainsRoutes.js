const express = require('express');
const axios = require('axios')
let trainsRouter = express.Router();

trainsRouter.get('/:city', async (req, res) => {
    const ROOT_URL1 = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=tgvmax%40datasncf&start=0&rows=10000&facet=date&facet=destination&facet=origine&refine.origine=`
    let { city } = req.params
    const tgvmaxdispo = "&exclude.od_happy_card=NON"
    try {
        let trains = await axios.get(`${ROOT_URL1}${city}${tgvmaxdispo}`)
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
        res.json(trains.slice(0, 200))
    }
    catch (err) {
        console.error(err)
    }
})



module.exports.trainsRouter = trainsRouter;
