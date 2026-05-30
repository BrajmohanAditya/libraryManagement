import { Module } from '@nestjs/common';
import { LibrarysService } from './librarys.service';
import { LibrarysController } from './librarys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './entities/library.entity';
import { LibraryPrice } from 'src/library_price/entities/library_price.entity';
import { LibraryFeature } from 'src/library-feature/entities/library-feature.entity';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Library, LibraryPrice , LibraryFeature]) , S3Module],
  controllers: [LibrarysController],
  providers: [LibrarysService],
})
export class LibrarysModule { }
