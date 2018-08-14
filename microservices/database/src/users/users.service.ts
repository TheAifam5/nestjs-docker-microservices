import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '@shared/dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private readonly usersRepository: typeof User,
  ) { }

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = 1;
    user.username = dto.username;
    user.password = dto.password;
    user.email = dto.email;

    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
}