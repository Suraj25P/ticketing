import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import { requireAuth, validateRequest ,NotFoundError ,OrderStatus, BadRequestError} from '@srptickets/common'
import { body } from "express-validator";
import {Ticket} from '../models/ticket'
import { Order } from '../models/order'
import { natsWrapper } from '../nats-wrapper';
import {OrderCreatedPublisher} from '../events/publishers/order-created-publisher'
const router = express.Router();
const EXPITATION_WINDOW_SECONDS =1*60
router.post('/api/orders',requireAuth,[
    body('ticketId')
        .not()
          .isEmpty()
          .custom((input:string)=> mongoose.Types.ObjectId.isValid(input))
        .withMessage('ticketId is required'),
], validateRequest, async (req: Request, res: Response) => {
  const {ticketId} = req.body
    //Find the ticket that the user is trying to purchase
  const ticket = await Ticket.findById(ticketId)
  if (!ticket)
    throw new NotFoundError()
    //make usre this ticket is not already reserved
  const isReserved = await ticket.isReserved()
  if (isReserved)
    throw new BadRequestError('Ticket is already reserved')
    //Calculate expiration date
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPITATION_WINDOW_SECONDS)
    //Build the order and save to DB
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  })
  await order.save()
    //publish orderevent created
  
     new OrderCreatedPublisher(natsWrapper.client).publish({
       id: order.id,
       version:order.version,
        status: order.status,
       userId: order.userId,
       expiresAt: order.expiresAt.toISOString(),
       ticket: {
         id: ticket.id,
         price:ticket.price
       }
        
    })
     res.status(200).send(order)
})

export  {router as newOrderRouter } 