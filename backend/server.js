const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')

app.use(cors())

app.get('/earthquakes', (req, res)=> {
    const options = {
        method: 'GET',
        url: 'https://everyearthquake.p.rapidapi.com/earthquakes',
        params: {
            start: '1',
            count: '100',
            type: 'earthquake',
            latitude: '33.962523',
            longitude: '-118.3706975',
            radius: '1000',
            units: 'miles',
            magnitude: '3',
            intensity: '1'
         },
        headers: {
            'X-RapidAPI-Key': '0c569bc259msh607acdabc330e72p169f7cjsnfc26f1a401c5',
            'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
        }
    };
    axios.request(options).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

app.listen(8080, () => console.log('server started'))