import Koa from 'koa'
import KoaBody from 'koa-body'
import koaJwt from 'koa-jwt'

import koaMiddlewares from './middlewares'
import { secret_key } from './router'

// import mysql from './models/mysql'
import router from './router'

const app = new Koa()

// app.use(async (ctx, next) => {
//     const result = await mysql.query()
//     console.log(result)
//     ctx.response.type = 'json'
//     ctx.response.body = result
//     next()
// })

app.use(KoaBody())

app.use(koaMiddlewares)

app.use(
    koaJwt({
        secret: secret_key,
    }).unless({
        path: [/^\/api\/login$/],
    })
)

app.use(router.routes())

app.use(router.allowedMethods())

app.listen(5442, () => {
    console.log('server is running at http://localhost:5442')
})
