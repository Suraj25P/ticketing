import { useState,useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/useRequest'
import Router from 'next/router'
const OrderShow = ({ order ,currentUser}) => {
    const [timeLeft, setTimeLeft] = useState(0)
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId:order.id,
        },
        onSuccess: (payment) => {
            console.log(payment)
            Router.push('/orders')
        }
    })
    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date()
            setTimeLeft(Math.round(msLeft/1000))
        }
        findTimeLeft()
        const timerTd = setInterval(findTimeLeft, 1000)
        
        return () => {
            clearInterval(timerTd)
        }
    }, [order])
    
    if (timeLeft < 0) {
        return <div>Order Expired</div>
    }
    
    return (<div>
        Time left to pay: {timeLeft} seconds
        <StripeCheckout 
            token={({id}) => doRequest(id)}
            stripeKey="pk_test_51IqI5zSEi5njNTzcTd6oefxDnMYh6BGL1Wd5eid5Z73KeO71kA6jhpPl2DsPA6O6jTz0hXya655yphYRdccDNUcj00ZwjcXc67"
            amount={order.ticket.price * 100}
            email={currentUser.email}
        />
        {errors}
    </div>)
    
}

OrderShow.getInitialProps = async(context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return {order:data}

}

export default OrderShow