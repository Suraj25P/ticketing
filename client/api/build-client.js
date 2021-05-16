//helper function to build client
import axios from 'axios'
export default ({req}) => {
    if (typeof window === 'undefined')
    {   //servicename.namespace.svc.cluster
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
        
    }
    else {
        //from browser
        return axios.create({
            baseURL: '/',
        })
    }
}