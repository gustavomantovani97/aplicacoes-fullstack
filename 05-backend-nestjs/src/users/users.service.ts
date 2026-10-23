import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  // Lista em memória: os dados voltam ao estado inicial quando o servidor reinicia.
  private readonly users: User[] = [
    { id: 1, name: 'Ana', email: 'ana@email.com' },
    { id: 2, name: 'Pedro', email: 'pedro@email.com' },
  ];

  findAll(): User[] {
    // Devolve uma cópia para quem chamar não conseguir alterar a lista interna.
    return [...this.users];
  }

  create(createUserDto: CreateUserDto): User {
    const email = createUserDto.email.toLowerCase();

    if (this.users.some((user) => user.email.toLowerCase() === email)) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const nextId = Math.max(0, ...this.users.map((user) => user.id)) + 1;
    const user: User = {
      id: nextId,
      name: createUserDto.name,
      email: createUserDto.email,
    };

    this.users.push(user);
    return user;
  }
}
