import mysql from 'mysql'
import config from '../config/default'

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
})

class Mysql {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    query<T>(query): Promise<T> {
        return new Promise((resolve, reject) => {
            pool.query(query, function (error, results) {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    }
}

export default new Mysql()
