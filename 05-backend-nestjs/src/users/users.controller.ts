import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto.js';
import { User } from './entities/user.entity.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiOkResponse({ type: User, isArray: true })
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo usuário' })
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({
    description: 'Nome vazio, e-mail inválido ou campo não permitido',
  })
  @ApiConflictResponse({ description: 'E-mail já cadastrado' })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }
}
