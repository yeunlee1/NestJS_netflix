import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositroy: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepositroy.save(createUserDto);
  }

  findAll() {
    return this.userRepositroy.find();
  }

  findOne(id: number) {
    const user = this.userRepositroy.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다!');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepositroy.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다!');
    }

    await this.userRepositroy.update({ id }, updateUserDto);
    return this.userRepositroy.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.userRepositroy.delete(id);
  }
}
