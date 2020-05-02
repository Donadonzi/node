const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, 'SomeSecretForSignature');
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

		if (!user) {
			throw new Error();
		}

		req.token = token;  // We use this to log user out
		req.user = user;
		next();
	}
	catch {
		res.status(401).send({ error: 'Please authenticate.' });
	}
}

module.exports = auth;