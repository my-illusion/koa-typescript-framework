import KoaRouter from 'koa-router'

import USER from '../controllers/user'

const routerPefix = '/api'
export const secret_key = 'my_token'

const router = new KoaRouter()
router.post(`${routerPefix}/login`, USER.handleLoginIn)

export default router
