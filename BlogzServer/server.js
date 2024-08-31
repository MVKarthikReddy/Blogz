const express = require('express')
const cors = require('cors');
const http = require('http');


const connectMongoDB = require('./config/dbConfig');
const authRouter = require('./routes/auth.router.js')
const blogRouter = require('./routes/blog.router')
const userRouter = require('./routes/user.router')
const commentRouter = require('./routes/comment.router')
const likeRouter = require('./routes/like.router')

require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server,   {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
}); // Creating socket server for realtime data sharing




// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


connectMongoDB()

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`); // Allow specific origin
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Handle preflight requests
  }
  
  next();
});

app.use(cors())

app.use(express.json()); //it  allows to parse JSON objects in the request body


server.listen(5000,() => {
    console.log(`server is running on ${5000}`)
})

app.get('/', (req, res) =>{
    res.json({
      message : "Backend is working fine"
    })
  })


// To attach our io to the request object, then we can use it in controllers or where ever we want
app.use((req, res, next) => {
  req.io = io;
  next();
});

   
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);


// A middleware to handle errors if they are not caught by other middlewares or handlers
app.use((err,req,res,next)=> {
  console.log(err.statusCode)
  const statusCode =err.statusCode || 500;
  const message = err.message||'Internal server Error';
  return res.status(statusCode).json({
      success :false,
      statusCode,
      message,
  });
});
