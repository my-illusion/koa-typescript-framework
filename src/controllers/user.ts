import jwt from 'jsonwebtoken'

import mysql from '../models/mysql'
import { Context } from 'koa'
import { secret_key, Controller, Post, Get } from '../router'

@Controller('/api')
export default class User {
    @Post()
    async login(ctx: Context): Promise<USER.response> {
        const { username, password } = ctx.request.body
        if (!username || !password) {
            return (ctx.body = {
                code: 400,
                data: null,
                msg: '参数不合法',
            })
        }

        // 从数据库中查询用户信息
        const result: Array<USER.user> = await mysql.query(
            `select * from user where username = "${username}" and password = "${password}"`
        )

        if (result && !result.length) {
            return (ctx.body = {
                code: 401,
                data: null,
                msg: '用户名或者密码错误',
            })
        } else {
            const token = jwt.sign(
                {
                    username: result[0].username,
                    id: result[0].id,
                },
                secret_key,
                {
                    expiresIn: '15s',
                }
            )
            return (ctx.body = {
                code: 200,
                data: token,
                msg: '登陆成功',
            })
        }
    }
}
