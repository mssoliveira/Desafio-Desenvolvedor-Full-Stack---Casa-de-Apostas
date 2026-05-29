import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/database/repository/users.repository';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<{
    access_token: string;
  }> {
    try {
      const user = await this.usersRepository.findByEmail(loginUserDto.email);
      if (!user) {
        throw new UnauthorizedException('User or password invalid');
      }

      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('User or password invalid');
      }

      const payload = { userId: user.id, email: user.email, name: user.name };

      const accessToken = await this.jwtService.signAsync(payload);

      return {
        access_token: accessToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw error;
    }
  }
}
