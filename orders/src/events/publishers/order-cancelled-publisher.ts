import { Publisher, OrderCancelledEvent, Subjects } from '@srptickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
     subject : Subjects.OrderCancelled = Subjects.OrderCancelled
}
