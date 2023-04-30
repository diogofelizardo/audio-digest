import User from '@domain/user/entity/user';
import UserRepositoryInterface from '@domain/user/repository/user-repository.interface';
import { PrismaClient, User as UserModel } from '@prisma/client';

export default class UserPrismaRepository implements UserRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: entity.id,
        profileName: entity.profileName,
        whatsappId: entity.whatsappId,
        balance: entity.balance,
        locale: entity.locale,
      },
    });
  }

  async update(entity: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: entity.id,
      },
      data: {
        balance: entity.balance,
        profileName: entity.profileName,
      },
    });
  }

  async find(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new Error('User not found');

    return new User(
      user.id,
      user.profileName || '',
      user.whatsappId,
      user.locale,
      user.balance,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const users = this.prisma.user.findMany();
    const listUsers = (await users).map((user: UserModel) => {
      return new User(
        user.id,
        user.profileName || '',
        user.whatsappId,
        user.locale,
        user.balance,
        user.createdAt,
        user.updatedAt,
      );
    });
    return listUsers;
  }

  async findByWhatsappId(whatsappId: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        whatsappId: whatsappId,
      },
    });

    if (!user) return undefined;

    return new User(
      user.id,
      user.profileName || '',
      user.whatsappId,
      user.locale,
      user.balance,
      user.createdAt,
      user.updatedAt,
    );
  }
}
