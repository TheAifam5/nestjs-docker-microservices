import { Controller } from '@nestjs/common';
import { MessagePattern, ClientProxy, Transport, Client } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { UserDto } from '@shared/dto/user.dto';
import { CreateUserDto } from '@shared/dto/create-user.dto';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP, options: { port: 3001 } })
  private db: ClientProxy;

  @MessagePattern({ cmd: 'create' })
  public create(dto: CreateUserDto): Observable<any> {
    return this.db.send({ cmd: 'create' }, dto);
  }

  @MessagePattern({ cmd: 'findAll' })
  public findAll(data: string): Observable<UserDto[]> {
    return this.db.send({ cmd: 'findAll' }, data);
  }
}