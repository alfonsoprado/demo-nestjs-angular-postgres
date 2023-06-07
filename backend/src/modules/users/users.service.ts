import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { assertColumnNotUsed, assertRecordExists, pagination } from 'src/helpers/typeorm';
import QueryUserDto from './dto/query-user.dto';
import ChangeRoleDto from './dto/change-role.dto';
import ChangeEmailDto from './dto/change-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async getByEmail(email: string) {
    return await assertRecordExists(
      this.usersRepository,
      { email },
      "An user with that email does not exist."
    );
  }

  async getByUsername(username: string) {
    return await assertRecordExists(
      this.usersRepository,
      { username },
      "An user with that username does not exist."
    );
  }

  async getById(id: string) {
    return await assertRecordExists(
      this.usersRepository,
      { id },
      "The user does not exist."
    );
  }

  async create(user: User) {
    await assertColumnNotUsed({
      repository: this.usersRepository,
      uniqueKeys: { email: user.email },
      message: "There already exists a user with that email."
    });
    await assertColumnNotUsed({
      repository: this.usersRepository,
      uniqueKeys: { username: user.username },
      message: "There already exists a user with that username."
    });

    const hashedPassword = await bcrypt.hash(user.password, 10);

    let newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword
    });

    newUser = await this.usersRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async changeRole(
    id: string,
    changeRoleDto: ChangeRoleDto,
  ) {
    let user = await assertRecordExists(
      this.usersRepository,
      { id },
      "The user does not exist."
    );
    user.role = changeRoleDto.role;
    return await this.usersRepository.save(user);
  }

  async changePassword(id: string, password: string,) {
    let user = await assertRecordExists(
      this.usersRepository,
      { id },
      "The user does not exist."
    );
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    return await this.usersRepository.save(user);
  }

  async changeEmail(id: string, changeEmailDto: ChangeEmailDto) {
    let user = await assertRecordExists(
      this.usersRepository,
      { id },
      "The user does not exist."
    );
    user.email = changeEmailDto.email;
    return await this.usersRepository.save(user);
  }

  async findAll(queryUserDto: QueryUserDto) {
    const dbQuery = this.usersRepository.createQueryBuilder();

    // Pagination
    pagination(dbQuery, queryUserDto);

    const [rows, totalRows] = await dbQuery.getManyAndCount();

    return {
      rows,
      totalRows
    };
  }

  async findOne(id: string) {
    return await assertRecordExists(
      this.usersRepository,
      { id },
      "The user does not exist."
    );
  }

  async activate(id: string) {
    let user = await assertRecordExists(
      this.usersRepository,
      { id },
      "The user does not exist."
    );
    if (!user.disabled_at) {
      throw new HttpException(
        "The user is already activated.",
        HttpStatus.BAD_REQUEST,
      );
    }
    user.disabled_at = null;
    return await this.usersRepository.save(user);
  }

  async disable(id: string) {
    let user = await assertRecordExists(
      this.usersRepository,
      { id },
      "The user does not exist."
    );
    if (user.disabled_at) {
      throw new HttpException(
        "The user is already activated.",
        HttpStatus.BAD_REQUEST,
      );
    }
    user.disabled_at = dayjs().toDate();
    return await this.usersRepository.save(user);
  }

  async verifyPassword(id: string, password: string) {
    const user = await this.usersRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      throw new HttpException(
        "The user does not exist.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        "Incorrect Password",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateEmail(user: User) {
    user.validated_email_at = dayjs().toDate();
    return await this.usersRepository.save(user);
  }
}
