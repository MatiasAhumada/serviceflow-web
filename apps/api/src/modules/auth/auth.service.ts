import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import {
  Plan,
  Subscription,
  SystemAdmin,
  User,
  UserType,
} from '../../entities';
import { SUBSCRIPTION_STATUS, SUBSCRIBER_TYPE } from '../../constants';
import * as bcrypt from 'bcrypt';
import { RegisterTrialDto } from './dtos/register-trial.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(SystemAdmin)
    private systemAdminRepository: Repository<SystemAdmin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
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

  async registerTrial(registerTrialDto: RegisterTrialDto) {
    const { email, password, name, planSlug } = registerTrialDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('El email ya está registrado');
    }

    const plan = await this.planRepository.findOne({
      where: { slug: planSlug },
    });
    if (!plan) {
      throw new UnauthorizedException('Plan no encontrado');
    }

    const systemAdmin = await this.systemAdminRepository.findOne({ where: {} });
    if (!systemAdmin) {
      throw new UnauthorizedException('System admin no encontrado');
    }

    const userType = await this.userTypeRepository.findOne({
      where: { code: 'admin' },
    });
    if (!userType) {
      throw new UnauthorizedException('User type no encontrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      name,
      passwordHash: hashedPassword,
      userType,
    });

    const savedUser = await this.userRepository.save(user);

    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 5);

    const subscription = this.subscriptionRepository.create({
      subscriberType: SUBSCRIBER_TYPE.USER,
      userId: savedUser.id,
      planId: plan.id,
      startDate: new Date(),
      endDate: trialEndDate,
      status: SUBSCRIPTION_STATUS.ACTIVE,
      isTrial: true,
      trialEndDate,
      autoRenew: false,
      createdById: systemAdmin.id,
    });

    await this.subscriptionRepository.save(subscription);

    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      userType: 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
        isTrial: true,
        trialEndDate,
      },
    };
  }
}
