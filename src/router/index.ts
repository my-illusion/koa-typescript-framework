// eslint-disable @typescript-eslint/no-explicit-any
import KoaRouter from 'koa-router'

export const secret_key = 'my_token'

interface Constructor {
    new (...args: any): any
    prefix: string
}

interface CollectionsItem {
    url: string
    method: 'get' | 'post'
    handler: (...args: any) => any
    constructor: Constructor
}

const router = new KoaRouter()

const collections: Array<CollectionsItem> = []

export function Controller(path = '') {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function (target): void {
        target.prefix = path
    }
}

export function Get(pathname?: string) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function (target, key: string): void {
        let path = ''
        if (!pathname) {
            path = `/${key}`
        } else {
            path = pathname
        }
        collections.push({
            url: path,
            method: 'get',
            handler: target[key],
            constructor: target.contructor,
        })
    }
}

export function Post(pathname?: string) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function (target, key: string): void {
        let path = ''
        if (!pathname) {
            path = `/${key}`
        } else {
            path = pathname
        }
        collections.push({
            url: path,
            method: 'post',
            handler: target[key],
            constructor: target.contructor,
        })
    }
}

collections.forEach((item) => {
    const prefix = item.constructor.prefix
    let url = item.url
    if (prefix) url = `${prefix}${url}`
    router[item.method](url, item.handler)
})

export default router
