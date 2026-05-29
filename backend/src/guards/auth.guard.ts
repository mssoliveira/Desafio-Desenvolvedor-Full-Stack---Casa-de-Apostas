import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private database: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const secret = this.configService.get('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });

      const findUser = await this.database.user.findUnique({
        where: {
          id: payload.userId,
        },
        omit: {
          password: true,
        },
      });

      if (!findUser) {
        throw new UnauthorizedException();
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader || Array.isArray(authHeader)) {
      return undefined;
    }
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
      return undefined;
    }

    return parts[1] as string;
  }
}
