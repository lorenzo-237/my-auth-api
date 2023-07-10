import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('serializeUser');
    done(null, user);
  }

  deserializeUser(user: User, done: (err, user: any) => void) {
    console.log('deserializeUser');
    const userDB = this.userService.fetchUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
