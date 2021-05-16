import  { Message } from 'node-nats-streaming'
import { Subjects, Listener, OrderCancelledEvent } from '@srptickets/common'
import { queueGroupName } from '../listeners/queue-group-name'
import { Ticket } from '../../models/tickets';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data:OrderCancelledEvent['data'],msg:Message) {
        
        //reach into tickets and find the ticket
             const ticket = await Ticket.findById(data.ticket.id)
        //if no ticket
        if (!ticket)
            throw new Error('Ticket not found')
        //mark the ticket as reserved by setting the orderI property on the ticket
        console.log('inside order cnacelled listener')
        ticket.set({orderId:undefined})
        //save the ticket
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version:ticket.version
        })
        //ack the message
        msg.ack()
    }
    
}