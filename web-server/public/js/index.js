
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const errorElement = document.getElementById('errorMsg');
const locationElement = document.getElementById('location');
const forecastElement = document.getElementById('forecast');


weatherForm.addEventListener('submit', (e) => {

	e.preventDefault();

	errorElement.textContent = '';
	locationElement.textContent = 'Loading...';
	forecastElement.textContent = '';

	const location = search.value;
	fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				locationElement.textContent = '';
				return errorElement.textContent = data.error;	
			}
			errorElement.textContent = '';
			locationElement.textContent = data.location;
			forecastElement.textContent = data.forecast;
		});
	});
});