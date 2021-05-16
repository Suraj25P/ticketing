import express, { Request, Response } from 'express'
const router = express.Router();
import { requireAuth } from '@srptickets/common'
import {Order} from '../models/order'
router.get('/api/orders',requireAuth,async (req: Request, res: Response) => {
     const orders =await Order.find({
          userTd:req.currentUser!.id
     }).populate('ticket')
     res.status(200).send(orders)
})

export  {router as indexOrderRouter } 