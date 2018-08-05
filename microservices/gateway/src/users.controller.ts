import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';

@Controller()
export class UsersController {
  // TODO: Set port and IP from environment using docker linkage
  @Client({ transport: Transport.TCP, options: { port: 8081 } })
  usersClient: ClientProxy;

  @Post()
  async create() {
    return this.usersClient.send({ cmd: 'create' }, 'new_user');
  }

  @Get()
  async findAll() {
    return this.usersClient.send({ cmd: 'get' }, 'current_user');
  }
}