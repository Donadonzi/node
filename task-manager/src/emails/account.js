const sgMail = require('@sendgrid/mail');



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'donadonzi@gmail.com',
		subject: 'Thanks for joining Task Manager',
		html: `Welcome to the Task Manager App, <strong>${name}</strong>. Let us know how things go with the app.`
	});
}

const sendUserDeleteEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'donadonzi@gmail.com',
		subject: 'Sorry to see you leave',
		html: `Dear <strong>${name}</strong>,</br>
			We are sad that you decided to leave us. Please let us know if there is anything that we can do to improve our services.`
	});
}


module.exports = {
	sendWelcomeEmail,
	sendUserDeleteEmail
}
