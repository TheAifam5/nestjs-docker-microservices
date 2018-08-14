import { User } from './user.entity';

export const UsersProviders = [
  {
    provide: 'UsersRepository',
    useValue: User,
  },
];