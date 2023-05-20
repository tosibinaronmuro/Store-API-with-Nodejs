require('dotenv').config()
//  async errors
require('express-async-errors')

const express=require('express')
const app=express()

const connectDB=require('./Database/connect')

const productsROuter=require('./Routes/products')



const notFoundMiddleware=require('./Middleware/notFound')
const errorHandlerMiddleware=require('./Middleware/errorHandler')
const { log } = require('console')

//express middlewares 
app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.status(200).send('<h1>Store API</h1><a href="/api/v1/products"> products route <a>')
}  )
app.use('/api/v1/products',productsROuter)

// products routes



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port=process.env.PORT || 5000
const start=async()=>{
    try {
       await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()