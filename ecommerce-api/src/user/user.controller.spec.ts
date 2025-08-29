import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '../auth/auth.guard';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn(),
    user: jest.fn(),
    getUserProducts: jest.fn(),
    getUserAddress: jest.fn(),
    removeUserProduct: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),

  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    const userDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
    }
    await controller.createUser(userDto)

    expect(mockUserService.createUser).toHaveBeenCalledTimes(1)
    expect(mockUserService.createUser).toHaveBeenCalledWith(userDto)
  })
});
