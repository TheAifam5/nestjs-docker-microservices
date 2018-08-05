import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'create' })
  create(data: string): number[] {
    console.log('we got connection to create a user');
    return [1, 2, 3, 4, 5];
  }

  @MessagePattern({ cmd: 'get' })
  findAll(data: string): number[] {
    console.log('we got connection to get current user');
    return [1, 2, 3, 4, 5];
  }
}
