import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/utils/services';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('AuthService.validateUser()');
    const user = await this.usersService.fetchUserByUsername(username);
    if (user) {
      const matched = this.hashService.comparePasswords(pass, user.password);
      if (matched) {
        console.log('[VALID]');
        return user;
      }
    }
    console.log('[INVALID]');
    return null;
  }
}
