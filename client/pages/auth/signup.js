import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/useRequest'

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,password
        },
        onSuccess: () => {
            Router.push('/')
        }
    })
    const onSubmit=async (e)=> {
        e.preventDefault()
        await doRequest()

    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign UP</h1>
            <div className="form-group">
                <label>Email address</label>
                <input className='form-control' value={email} onChange={ e=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input className='form-control' type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            {errors}
            <button className='btn btn-primary'>Sign Up</button>
        </form>
    )
}