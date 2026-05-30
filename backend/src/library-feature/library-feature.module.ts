import { Module } from '@nestjs/common';
import { LibraryFeatureService } from './library-feature.service';
import { LibraryFeatureController } from './library-feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryFeature } from './entities/library-feature.entity';
import { Library } from 'src/librarys/entities/library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryFeature, Library])],
  controllers: [LibraryFeatureController],
  providers: [LibraryFeatureService],
})
export class LibraryFeatureModule {}
