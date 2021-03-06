import express, { Request, Response } from 'express'
const router = express.Router();
import { requireAuth,NotFoundError,NotAuthorizedError} from '@srptickets/common'
import {Order,OrderStatus} from '../models/order'
import { natsWrapper } from '../nats-wrapper';
import {OrderCancelledPublisher} from '../events/publishers/order-cancelled-publisher'
router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
     const { orderId } = req.params
     const order = await Order.findById(orderId).populate('ticket')
     if (!order) {
          throw new NotFoundError()
     }
     if (order.userId !== req.currentUser!.id) {
          throw new NotAuthorizedError()
     }

     order.status = OrderStatus.Cancelled
     await order.save()

     new OrderCancelledPublisher(natsWrapper.client).publish({
          id: order.id,
          version:order.version,
       ticket: {
         id: order.ticket.id,
       }
        
    })
     res.status(200).send(order)
})

export  {router as deleteOrderRouter } 