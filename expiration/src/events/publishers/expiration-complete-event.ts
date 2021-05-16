import { Publisher, ExpirationCompleteEvent, Subjects } from '@srptickets/common'
export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
     subject : Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
