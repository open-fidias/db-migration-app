
import pg from 'pg'
process.env.PGAPPNAME = 'fidias-db-migration'

const connection = {
    instance: null,
    isConnected: false
}

export const connect = (params) => {
    return new Promise((resolve, reject) => {
        if (connection.instance != null) {
            return resolve(connection)
        }
        connection.instance = new pg.Client(params)
        connection.instance.connect((err) => {
            if (err) {
                resetConnection()
                return reject(err)
            }
            console.log('db connected')
            connection.isConnected = true
            return resolve(connection)
        })
    })
}

export const disconnect = () => {
    return new Promise((resolve, reject) => {
        if (connection.instance) {
            connection.instance.end((err) => {
                console.log('db disconnected')
                resetConnection()
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        } else {
            resetConnection()
            resolve()
        }
    })
}

const resetConnection = () => {
    connection.isConnected = false
    connection.instance = null
}
