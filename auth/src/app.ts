/*  AUTHENTICATION SERVICE
--deals with signin signup signout and current-user functionality
*/

import express, { json } from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler,NotFoundError } from "@srptickets/common";

const app = express()
app.set('trust proxy',true)
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', (req,res) => {
    throw new NotFoundError()

})
app.use(errorHandler)

export {app}