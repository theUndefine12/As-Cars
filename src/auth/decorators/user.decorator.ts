import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user

    return data ? user?.[data] : user;
  },
)

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const User = createParamDecorator(
//   (data: string, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const user = request.user;

//     if (data) {
//       return user ? user[data] : null;
//     }

//     return user;
//   },
// );
