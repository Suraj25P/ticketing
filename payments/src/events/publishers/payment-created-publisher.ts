import { PaymentCreatedEvent, Publisher, Subjects } from "@srptickets/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
    
}