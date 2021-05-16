/*  AUTHENTICATION SERVICE
--deals with signin signup signout and current-user functionality
*/

import express, { json } from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError,currentUser } from "@srptickets/common";
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'
import { indexTicketRouter } from './routes/index'
import { updateTicketRouter } from './routes/update'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use(currentUser)
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)



app.all('*', (req,res) => {
    throw new NotFoundError()

})
app.use(errorHandler)

export {app}