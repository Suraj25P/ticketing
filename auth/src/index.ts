//startup script for app.ts(auth service)
import mongoose, { mongo } from 'mongoose'
import { app } from './app'

//function tries to connect to auth db , then listens to incomming traffic
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('JWT_KEY must be defined')
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
        });
        console.log('CONNECTED TO MONGODB')
    } catch (err) {
        console.log(err)
    }

    app.listen(3000, () => {
    console.log("AUTH SERVICE LISITENING ON PORT 3000!!!")
    })

}
start()