import { Injectable } from '@nestjs/common';
import { SimpleClass } from '@shared/simple-class';

@Injectable()
export class AppService {
  private cls: SimpleClass;

  public constructor() {
    this.cls = new SimpleClass();
  }

  root(): string {
    return this.cls.getName();
  }
}
