import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabasesModule } from './databases/databases.module';

@Global()
@Module({
  imports: [ConfigModule, DatabasesModule],
  exports: [ConfigModule, DatabasesModule],
})
export class CommonModule {}
