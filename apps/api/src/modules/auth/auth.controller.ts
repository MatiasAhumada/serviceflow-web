import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dtos/register.dto';
import { RegisterTrialDto } from './dtos/register-trial.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return JWT token',
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Create new user account and return JWT token',
  })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('register-trial')
  @ApiOperation({
    summary: 'Register with free trial',
    description: 'Create new user with 5-day free trial',
  })
  @ApiResponse({
    status: 201,
    description: 'Trial account created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async registerTrial(@Body() body: RegisterTrialDto) {
    return this.authService.registerTrial(body);
  }
}
