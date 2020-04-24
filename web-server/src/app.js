const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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

app.get('/weather', (req, res) => {
	res.send({
		location: 'Toronto',
		forecast: 'Sunny'
	});
});

app.listen(3000, () => {
	console.log('Server is running!')
}); // port is optional