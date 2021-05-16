import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/useRequest'
const NewTicekt = () => {
    const [price, setPrice] = useState('')
    const [title, setTitle] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/tickets/new',
        method: 'post',
        body: {
            title,price
        },
        onSuccess: (ticket) => {
            console.log(ticket)
            Router.push('/')
        }
    })

    const onSubmit=async (e)=> {
        e.preventDefault()
        doRequest()

    }


    const onBlur = () => {
        const value = parseFloat(price)
        if (isNaN(value)) {
            return
        }

        setPrice(value.toFixed(2))
    }


    return <div>
        <h1>
            Create a ticket
         </h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input className='form-control' value={title} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input className='form-control' onBlur={onBlur} value={price} onChange={ e=>setPrice(e.target.value)}/>
            </div>
            {errors}
            <button className='btn btn-primary'>Create</button>
        </form>
     </div>
}

export default NewTicekt