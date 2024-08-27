const express = require('express')
const cors = require('cors');
const connectMongoDB = require('./config/dbConfig');
const authRouter = require('./routes/auth.router.js')
const blogRouter = require('./routes/blog.router')
const userRouter = require('./routes/user.router')

require('dotenv').config()

const app = express();

connectMongoDB()

app.use(cors());

app.use(express.json()); //it  allows to parse JSON objects in the request body


app.listen(5000,() => {
    console.log(`server is running on ${5000}`)
})

app.get('/', (req, res) =>{
    res.json({
      message : "Backend is working fine"
    })
  })


app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);



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
