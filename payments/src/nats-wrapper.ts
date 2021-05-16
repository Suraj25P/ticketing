import nats, { Stan } from 'node-nats-streaming'
class NatsWrapper {
    private _client?: Stan
    get client() {
        if (!this._client)
            throw new Error('cannot access nats client before connecting')
        return this._client
    }
    connect(clustedId:string,clientId:string,url:string) {
        this._client = nats.connect(clustedId, clientId, { url })
        
        return new Promise<void>((resolve,reject) => {
            this.client.on('connect', () => {
                console.log('CONNECTED TO NATS')
                resolve()
            })
            this.client.on('error', (err) => {
                reject(err) 
            })
        })
    }
}

export const natsWrapper = new NatsWrapper()
