import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserProfile } from '../dto';

interface RequestWithUser {
  user: UserProfile;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserProfile => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();

    return (request as RequestWithUser).user;
  },
);
