import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

describe('UsersController', () => {
  let controller: UsersController;
  // O service é simulado: aqui o teste confere só que o controller repassa os dados.
  const usersService = { findAll: vi.fn(), create: vi.fn() };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get(UsersController);
  });

  it('GET devolve o que o service listar', () => {
    const users = [{ id: 1, name: 'Ana', email: 'ana@email.com' }];
    usersService.findAll.mockReturnValue(users);

    expect(controller.findAll()).toBe(users);
  });

  it('POST repassa o corpo para o service e devolve o usuário criado', () => {
    const dto = { name: 'Maria', email: 'maria@email.com' };
    const created = { id: 3, ...dto };
    usersService.create.mockReturnValue(created);

    expect(controller.create(dto)).toBe(created);
    expect(usersService.create).toHaveBeenCalledWith(dto);
  });
});
