const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Yallah! Server umad bala roo port ' + port);
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

