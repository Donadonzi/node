const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {   // We specify the database name in the URL
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});
