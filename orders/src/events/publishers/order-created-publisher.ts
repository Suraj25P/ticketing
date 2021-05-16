import { Publisher, OrderCreatedEvent, Subjects } from '@srptickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
     subject : Subjects.OrderCreated = Subjects.OrderCreated
}
