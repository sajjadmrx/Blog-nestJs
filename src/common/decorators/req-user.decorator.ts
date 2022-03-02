import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';


export const getUser = createParamDecorator(<T extends object>(data: string, ctx: ExecutionContext): T => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const user = request['user']

  return data ? user?.[data] : user as T;
})


