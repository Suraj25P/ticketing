import  { Message } from 'node-nats-streaming'
import { Subjects, Listener, OrderCreatedEvent } from '@srptickets/common'
import { queueGroupName } from '../listeners/queue-group-name'
import { Ticket } from '../../models/tickets';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data:OrderCreatedEvent['data'],msg:Message) {
        
        //reach into tickets and find the ticket
             const ticket = await Ticket.findById(data.ticket.id)
        //if no ticket
        if (!ticket)
            throw new Error('Ticket not found')
        //mark the ticket as reserved by setting the orderI property on the ticket
        ticket.set({orderId:data.id})
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