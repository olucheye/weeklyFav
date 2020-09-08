require('express-async-errors');
const express = require('express');
const app = express();
const initDB = require('./config/db');
const preMiddleware = require('./middlewares/preMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');
const {currentUser} = require('./middlewares/authMiddleware');


preMiddleware(app);

//Router
// app.use('/', webRoute);
// app.get('*', currentUser);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);


//invoke error middleware
errorMiddleware(app);

const PORT = process.env.PORT || 5000;
initDB();
app.listen(PORT, ()=> console.log(`:::> Server now open on PORT ${PORT}. Access via http://localhost/${PORT}`));



/**
 * 
 * 
 * 
 */