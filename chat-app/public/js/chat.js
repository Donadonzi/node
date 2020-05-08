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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });



//////// A function for controlling autimatic scrolling /////////
const autoscroll = () => {

	// Get the new message element
	const $newMessage = $messages.lastElementChild;

	// Get the height of the new message
	const newMessageStyles = getComputedStyle($newMessage);
	const newMessageMargin = parseInt(newMessageStyles.marginBottom);
	const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

	// Visible height
	const visibleHeight = $messages.offsetHeight;

	// Total height of the messages container
	const containerHeight = $messages.scrollHeight;

	// How far the user has scrolled?
	const scrollOffset = $messages.scrollTop + visibleHeight;

	// Decide wether to auto-scroll or not
	if (containerHeight - newMessageHeight <= scrollOffset) {
		$messages.scrollTop = $messages.scrollHeight;   // go all the way down
	}
}


//////// Event listener for chat messages /////////
socket.on('message', (message) => {

	const html = Mustache.render(messageTemplate, {
		username: message.username,
		message: message.text,
		createdAt: moment(message.createdAt).format('h:mm a')
	});

	$messages.insertAdjacentHTML('beforeend', html);
	autoscroll();

});

//////// Event listener for url ////////
socket.on('locationMessage', (message) => {
	const html = Mustache.render(locationTemplate, {
		username: message.username,
		url: message.url,
		createdAt: moment(message.createdAt).format('h:mm a')
	});
	$messages.insertAdjacentHTML('beforeend', html);
	autoscroll();
});


//////// Event listener for getting room data ////////
socket.on('roomData', ({ room, users }) => {
	const html = Mustache.render(sidebarTemplate, { room, users });
	document.querySelector('#sidebar').innerHTML = html;
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
		// console.log('Message delivered!');
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



//////// Send off username and room to server /////////
socket.emit('join', { username, room }, (error) => {
	if (error) {
		alert(error);
		location.href = '/';
	}
});


