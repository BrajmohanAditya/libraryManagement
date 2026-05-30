import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), S3Module],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
