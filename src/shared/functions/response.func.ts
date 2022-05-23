import { HttpStatus } from '@nestjs/common'

export function responseData(items: { statusCode: keyof typeof HttpStatus, message: string, data?: any }): Object {
    return {
        statusCode: HttpStatus[items.statusCode],
        message: items.message,
        data: items.data || {}
    }
}
