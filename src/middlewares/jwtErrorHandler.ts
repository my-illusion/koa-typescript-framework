import { Context, Next } from 'koa'

const jwtErrorHandler = (ctx: Context, next: Next): Promise<unknown> => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            return ctx.sendError('401', '未授权, 访问被拒绝')
        } else {
            throw err
        }
    })
}

export default jwtErrorHandler
