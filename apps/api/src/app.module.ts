import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigService } from './common/config/config.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    AuthModule,
    CacheModule.register(),
    CommonModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = AppModule.normalizePort(this._configService.port);
    AppModule.isDev = this._configService.isDev;
  }

  private static normalizePort(val: number | string): number | string {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

    if (Number.isNaN(port)) return val;
    if (port >= 0) return port;

    throw new Error(`Port "${val}" is invalid.`);
  }
}
