import { Publisher, TicketCreatedEvent, Subjects } from '@srptickets/common'
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
     subject : Subjects.TicketCreated = Subjects.TicketCreated
}
