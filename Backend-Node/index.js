require('dotenv').config();
require('express-async-errors');

const { urlencoded } = require('express');
const express = require('express');
const app = express();

//routers
const taskRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

//db connection
const connectDB = require('./db/connect');

//middleware
const NotFoundMiddleware = require('./middleware/NotFound');
const authenticationMiddleware = require('./middleware/authentication');
const errorHandlerMiddleware = require('./middleware/error-handler');

//security packages
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

//security middleware
app.set('trust proxy', 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.get('/', (req, res) => res.send('first express app'));

//routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', authenticationMiddleware, taskRouter);

//error handler middleware
app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('connected successfully');
    app.listen(port, () => console.log('app listening on port 3000'));
  } catch (error) {
    console.log(error);
  }
};

start();
