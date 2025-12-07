import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    await this.usersService.updateLastLogin(user.id);

    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType.code,
      companyId: user.company?.id,
      roleId: user.role?.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        company: user.company,
        role: user.role,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    userTypeCode: string;
    companyId?: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await this.usersService.create({
      email: userData.email,
      name: userData.name,
      passwordHash: hashedPassword,
      userTypeCode: userData.userTypeCode,
      companyId: userData.companyId,
    });

    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType.code,
      companyId: user.company?.id,
      roleId: user.role?.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        company: user.company,
        role: user.role,
      },
    };
  }
}