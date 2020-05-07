const socket = io();

// DOM elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

//////// Event listener for chat messages /////////
socket.on('message', (message) => {
	const html = Mustache.render(messageTemplate, { chatMessage: message });
	$messages.insertAdjacentHTML('beforeend', html);
	console.log(message);
});

//////// Event listener for url ////////
socket.on('locationMessage', (url) => {
	const html = Mustache.render(locationTemplate, { url });
	$messages.insertAdjacentHTML('beforeend', html);
	console.log(url);
});

//////// Send off text to server on click /////////
$messageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	$messageFormButton.setAttribute('disabled', 'disabled');

	// const text = document.querySelector('#message').value;   OR below
	const text = e.target.elements.message.value;
	socket.emit('sendMessage', text, (error) => {

		$messageFormButton.removeAttribute('disabled');
		$messageFormInput.value = '';
		$messageFormInput.focus();

		if (error) {
			return console.log(error);
		}
		console.log('Message delivered!');
	});
});


//////// Send off location to server on click /////////
$sendLocationButton.addEventListener('click', () => {
	if (!navigator.geolocation) {
		return alert('Your browser does not support geolocation!');
	}

	$sendLocationButton.setAttribute('disabled', 'disabled');

	navigator.geolocation.getCurrentPosition((position) => {
		const data = {
			lat: position.coords.latitude,
			long: position.coords.longitude
		}
		socket.emit('sendLocation', data, () => {
			$sendLocationButton.removeAttribute('disabled');
			console.log('Location shared!');
		});
	});
});