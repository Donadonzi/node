const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Route handlers
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Donadonzi'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Donadonzi'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'Do you need some help?',
		title: 'Help',
		name: 'Donadonzi'
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMsg: 'Help article not found.',
		name: 'Donadonzi',
		title: '404'
	})
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Address must be provided.'
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				location,
				forecast: forecastData,
				address: req.query.address
			});
		});
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		errorMsg: 'Page not found.',
		name: 'Donadonzi',
		title: '404'
	});
});



// We removed this (below) since we added the code above:
// app.use(express.static(publicDirectory));
// and that's gonna load the files in this path. This is for static files.

// app.get('', (req, res) => {
// 	res.send('Hello Express!!');
// });

// app.get('/help', (req, res) => {
// 	res.send({
// 		name: 'Donya',
// 		help: null
// 	});
// });

// app.get('/about', (req, res) => {
// 	res.send(`<h2>What about sunrise?</h2>`);
// });



// We have to change this in order to deploy the site on heroku
// app.listen(3000, () => {
// 	console.log('Yallah! Server umad bala!')
// });

app.listen(port, () => {
	console.log('Yallah! Server umad bala roo port: ' + port);
});