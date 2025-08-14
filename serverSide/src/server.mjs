import express, { response } from 'express' 
import dotenv from "dotenv"
import authRoutes from './routes/auth.route.mjs'
import userRouter from './routes/user.router.mjs'
import chatRouter from './routes/chat.router.mjs'
import { connectDB } from './db_Connect/db.mjs'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'


dotenv.config()
const app=express()
const PORT=process.env.PORT || 5050
const __dirname = path.resolve()

app.use(cors({
    origin: 'http://localhost:5173', // React app URL
    credentials: true, // Allow cookies to be sent
}))

//inbuilt middleware
app.use(express.json()) 
app.use(cookieParser())


// for authorigation user 
app.use('/api/auth',authRoutes)
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../clientSide/dist')))
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../clientSide','dist', 'index.html'))
    })
}

app.get('/',(request,response)=>{
    response.send('hellow world')
})


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB();

})
