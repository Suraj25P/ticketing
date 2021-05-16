import mongoose from 'mongoose'


interface PaymentAttrs {
    orderId: string,
    stripeId:string   

}

//interface that describes the properties that a Payment model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
    build(attrs:PaymentAttrs) : PaymentDoc
}

//interface that descripbes the properties that a Payment document has
interface PaymentDoc extends mongoose.Document{
    orderId: string,
    stripeId:string 
}


const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true,
    },
},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    })

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs)

}

const Payment = mongoose.model<PaymentDoc,PaymentModel>('Payment', paymentSchema)


export {Payment}