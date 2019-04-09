const Sqlite = require('better-sqlite3')

const connection = {
    instance: null,
    isConnected: false
}

export const connect = (params) => {
    return new Promise((resolve, reject) => {
        if (connection.instance != null) {
            return resolve(connection)
        }
        try {
            connection.instance = new Sqlite(params.path)
            connection.isConnected = true
            return resolve(connection)
        } catch (e) {
            return reject(e)
        }
    })
}

export const disconnect = () => {
    return new Promise((resolve, reject) => {
        if (connection.instance) {
            try {
                connection.instance.close()
                resetConnection()
                resolve()
            } catch (e) {
                return reject(e)
            }
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
