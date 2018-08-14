import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '@shared/dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from '@shared/dto/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern({ cmd: 'create' })
  async create(dto: CreateUserDto) {
    // TODO: map to UserDTO
    return (await this.usersService.create(dto));
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll(): Promise<UserDto[]> {
    return (await this.usersService.findAll())
      .map(v => ({ id: v.id, username: v.username, email: v.email }));
  }
}