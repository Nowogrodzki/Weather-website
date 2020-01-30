const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utiles/forecast');
const geocode = require('./utiles/geocode');
const app = express();

const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set("view engine", "hbs");
app.set('views', viewPath);
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: "Welcome to my site",
        name: "Created by Maciek Nowogrodzki"
    });
});

app.get("/help", (req, res) => {
    res.render('help', {
        title: "How can i help you",
        name: "Created by Maciek Nowogrodzki"
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Maciek Nowogrodzki"
    });
});


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide a address term"
        })
    } else {
        geocode(req.query.address, (error, {
            location = "",
            latitude = 0,
            longitude = 0
        } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send(({
                        error
                    }));
                }
                res.send({
                    location,
                    weather: forecastData,
                    addressProvided: req.query.address
                });
            });
        });
    };
});

app.get('/help/*', (req, res) => {
    res.render('prob', {
        title: "404",
        error: "Help article not found"
    });
});

app.get('*', (req, res) => {
    res.render('prob', {
        title: "404",
        error: "Page not found"
    });
});



app.listen(3000, () => {
    console.log("serwer is up");
});