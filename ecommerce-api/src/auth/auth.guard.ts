import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  @Inject()
  private readonly jwtService: JwtService;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) {
      throw new UnauthorizedException('Token is required'); // No token provided
    }

    try {
      const payload = this.jwtService.verify(authorization, {
        secret: process.env.SECRET_KEY, // Use the same secret as in JwtModule
      });
      request['userId'] = payload
    } catch (error) {
      throw new UnauthorizedException('Invalid token'); // Token verification failed
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
