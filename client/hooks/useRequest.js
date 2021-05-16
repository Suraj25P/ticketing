//custom hook
//this hook handles making a request 
//returns erroes and the function that makes the request
 
import { useState } from 'react'
import axios from 'axios'

export default ({ url, method, body , onSuccess }) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async (props={}) => {
        try {
             setErrors(null)
            const response = await axios[method](url, 
                {...body,...props})
            if (onSuccess) {
                onSuccess(response.data)
            }
            return response.data 
         } catch (err) {             
                setErrors(
                <div className='alert alert-danger'>
                    <h4>Oops...</h4>
                    <ul className='my-0'>
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
             )
        }
    };

    return {doRequest, errors}
}