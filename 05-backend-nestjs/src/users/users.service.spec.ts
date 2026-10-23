import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get(UsersService);
  });

  it('começa com Ana e Pedro', () => {
    expect(service.findAll()).toEqual([
      { id: 1, name: 'Ana', email: 'ana@email.com' },
      { id: 2, name: 'Pedro', email: 'pedro@email.com' },
    ]);
  });

  it('cria um usuário com o próximo id e o inclui na lista', () => {
    const created = service.create({ name: 'Maria', email: 'maria@email.com' });

    expect(created).toEqual({ id: 3, name: 'Maria', email: 'maria@email.com' });
    expect(service.findAll()).toHaveLength(3);
  });

  it('recusa e-mail já cadastrado, sem diferenciar maiúsculas', () => {
    expect(() =>
      service.create({ name: 'Outra Ana', email: 'ANA@email.com' }),
    ).toThrow(ConflictException);
    expect(service.findAll()).toHaveLength(2);
  });

  it('não deixa quem chamou alterar a lista interna', () => {
    service.findAll().push({ id: 99, name: 'Intruso', email: 'x@email.com' });

    expect(service.findAll()).toHaveLength(2);
  });
});
