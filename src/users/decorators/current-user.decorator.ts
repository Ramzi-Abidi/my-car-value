import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// "ExecutionContext" we can call the "ExecutionContext" a "Request" but rather than that we use the word "ExecutionContext" to exclude http, and be able to use the code in "gRPC", "socket"
// "never" is a sign that data will never be used, which means the docrator @CurrentUser() can never take an argument
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
