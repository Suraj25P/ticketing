/*  AUTHENTICATION SERVICE
--deals with signin signup signout and current-user functionality
*/

import express, { json } from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError,currentUser } from "@srptickets/common";
import { newOrderRouter } from './routes/new'
import { showOrderRouter } from './routes/show'
import { indexOrderRouter } from './routes/index'
import { deleteOrderRouter } from './routes/delete'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use(currentUser)
app.use(showOrderRouter)
app.use(newOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)



app.all('*', (req,res) => {
    throw new NotFoundError()

})
app.use(errorHandler)

export {app}