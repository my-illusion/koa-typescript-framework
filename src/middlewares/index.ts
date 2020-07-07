import koaCompose from 'koa-compose'

import jwtErrorHandler from './jwtErrorHandler'
import sendHandler from './sendHandler'

export default koaCompose([sendHandler, jwtErrorHandler])
