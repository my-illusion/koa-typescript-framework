declare namespace USER {
    interface user {
        id: number
        username: string
        password: string
    }
    interface response {
        data: Record<string, unknown> | null
        code: string | number
        msg: string | null
    }
}
