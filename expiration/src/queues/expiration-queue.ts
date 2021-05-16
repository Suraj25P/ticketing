import Queue from 'bull'
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-event'
import { natsWrapper } from '../nats-wrapper'

interface payload{
    orderId: string;
}

const expirationQueue = new Queue<payload>('order:expiration', {
    redis: {
        host:process.env.REDIS_HOST
    }
})

expirationQueue.process(async (job) => {
    console.log('expiration complete pub')
    new ExpirationCompletePublisher(natsWrapper.client).publish({
     orderId:job.data.orderId
 })
})

export {expirationQueue}