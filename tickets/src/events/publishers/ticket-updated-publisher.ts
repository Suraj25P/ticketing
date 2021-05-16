import { Publisher, TicketUpdatedEvent, Subjects } from '@srptickets/common'
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
     subject : Subjects.TicketUpdated = Subjects.TicketUpdated
}
 