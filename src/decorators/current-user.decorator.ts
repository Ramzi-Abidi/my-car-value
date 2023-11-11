import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// "ExecutionContext" we can call the "ExecutionContext" a "Request" but rather than that we use the word "ExecutionContext" to exclude http, and be able to use the code in "gRPC", "socket"  
export const CurrentUser = createParamDecorator((data: any, context: ExecutionContext) => {

  },
);
