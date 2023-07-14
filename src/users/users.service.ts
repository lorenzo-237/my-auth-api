import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { HashService } from 'src/utils/services';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private hash: HashService) {}

  fetchUsers() {
    return this.prisma.user.findMany();
  }

  fetchUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async fetchUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async createUser(userDto: CreateUserDto) {
    const passwordHash = this.hash.encodePassword(userDto.password);

    return this.prisma.user.create({
      data: { ...userDto, password: passwordHash },
    });
  }
}
