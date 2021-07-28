import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly currentEnv: string = process.env.NODE_ENV || 'development';
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    const result = dotenv.config();
    if (result.error) throw result.error;
  }

  get port(): string | number {
    this.logger.log('Getting port from env...');
    return process.env.PORT || 8000;
  }

  get isDev(): boolean {
    this.logger.log('Getting current environment...');
    return this.currentEnv === 'development';
  }

  get jwtTtl() {
    this.logger.log('Getting jwt ttl...');
    const jwtTtl = parseInt(process.env.JWT_TTL, 10);
    return jwtTtl;
  }

  get jwtPublicKey() {
    this.logger.log('Getting jwt public...');
    const publicKey = fs.readFileSync(
      `${process.cwd()}/.secret/public-key.pem`,
      {
        encoding: 'utf8',
      },
    );
    return publicKey;
  }

  get jwtPrivateKey() {
    this.logger.log('Getting jwt private...');
    const privateKey = fs.readFileSync(
      `${process.cwd()}/.secret/private-key.pem`,
      {
        encoding: 'utf8',
      },
    );
    return privateKey;
  }
}
