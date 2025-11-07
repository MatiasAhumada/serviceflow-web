import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../../entities';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Retrieve list of all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID', description: 'Retrieve a specific user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user', description: 'Update user information' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user', description: 'Remove a user from the system' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}