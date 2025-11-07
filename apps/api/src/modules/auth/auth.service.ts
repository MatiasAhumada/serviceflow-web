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

    const payload = {
      sub: user.id,
      email: user.email,
      planType: user.planType,
      companyId: user.companyId,
      roleId: user.roleId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        planType: user.planType,
        companyId: user.companyId,
        roleId: user.roleId,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    planType: string;
    companyId?: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await this.usersService.create({
      ...userData,
      passwordHash: hashedPassword,
    });

    const payload = {
      sub: user.id,
      email: user.email,
      planType: user.planType,
      companyId: user.companyId,
      roleId: user.roleId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        planType: user.planType,
        companyId: user.companyId,
        roleId: user.roleId,
      },
    };
  }
}