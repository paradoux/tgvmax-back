const express = require('express');
const axios = require('axios')
let trainsRouter = express.Router();

/* Utilisation of the SNCF (French railroad company) API */
/* Problem: The data arrives not sorted by departure dates and hours */
/* Solution: Create a Node.js server proxy that get all the trains unordered, sort them and send them to a React.js app  */

trainsRouter.get('/:city/:date', async (req, res) => {
    var url;
    const ROOT_URL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=tgvmax%40datasncf&start=0&rows=10000&facet=date&facet=destination&facet=origine`
    var { city, date } = req.params
    const tgvmaxdispo = "&exclude.od_happy_card=NON"
    /* The user can add a departure date or not, we change the request url accordingly */
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
        /* We wait for the response of the SNCF API and we sort the results */
        let trains = await axios.get(url)
        trains = trains.data.records.sort((a, b) => {
            let houra = a.fields.heure_depart; // Style:"08:35"
            let hourb = b.fields.heure_depart;
            let datea = a.fields.date; // Style: "2018-08-28"
            let dateb = b.fields.date;
            /* We turn each departure into a date+hour figure and we compare each one to sort all of them  */
            if (houra.length < 5) { houra = houra.split(""); houra.unshift("0"); houra = houra.join(''); } //Departure hours under 10 are in one digit so we convert them into two digits numbers
            if (hourb.length < 5) { hourb = hourb.split(""); hourb.unshift("0"); hourb = hourb.join(''); }
            a = datea.replace(/-/g, "").concat(houra.replace(/:/g, '')); //We erase the "-" between the date's figures
            b = dateb.replace(/-/g, "").concat(hourb.replace(/:/g, ''));
            return a - b; //We sort them from lower to higher number, meaning from sooner to later trains
        });
        console.log("The request is a success !")
        res.json(trains.slice(0, 2000))
    }
    catch (err) {
        console.error(err)
    }
})

module.exports.trainsRouter = trainsRouter;
