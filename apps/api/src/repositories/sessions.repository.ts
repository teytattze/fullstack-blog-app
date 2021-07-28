import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { DatabasesService } from '../common/databases/databases.service';

@Injectable()
export class SessionsRepository {
  private readonly logger = new Logger(SessionsRepository.name);
  constructor(private readonly prisma: DatabasesService) {}

  async findSession(userId: string): Promise<Session> {
    try {
      return await this.prisma.session.findUnique({
        where: { userId },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async updateSession(
    userId: string,
    data: Prisma.SessionUpdateInput,
  ): Promise<Session> {
    try {
      return await this.prisma.session.update({
        where: { userId },
        data,
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async invalidateSession(userId: string): Promise<Session> {
    try {
      return await this.prisma.session.update({
        where: { userId },
        data: {
          csrfToken: null,
          csrfTokenExpires: null,
          refreshToken: null,
          refreshTokenExpires: null,
        },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }
}
