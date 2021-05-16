/*  AUTHENTICATION SERVICE
--deals with signin signup signout and current-user functionality
*/

import express, { json } from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError,currentUser } from "@srptickets/common";
import { createChargeRouter } from './router/new';

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use(currentUser)
app.use(createChargeRouter)



app.all('*', (req,res) => {
    throw new NotFoundError()

})
app.use(errorHandler)

export {app}