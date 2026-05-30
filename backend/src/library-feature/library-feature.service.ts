import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLibraryFeatureDto } from './dto/create-library-feature.dto';
import { UpdateLibraryFeatureDto } from './dto/update-library-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryFeature } from './entities/library-feature.entity';
import { Repository } from 'typeorm';
import { Library } from 'src/librarys/entities/library.entity';

@Injectable()
export class LibraryFeatureService {
  constructor(
    @InjectRepository(LibraryFeature)
    private readonly libraryFeatureRepository: Repository<LibraryFeature>,
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
  ) { }
  async create(createLibraryFeatureDto: CreateLibraryFeatureDto, adminId: string) {
    const library = await this.libraryRepository.findOne({
      where: { id: createLibraryFeatureDto.libraryId, admin: { id: adminId } }
    });

    if (!library) {
      return {
        message: 'Library not found or you do not have permission',
      };
    }

    const libraryFeature = this.libraryFeatureRepository.create(createLibraryFeatureDto);

    const data = await this.libraryFeatureRepository.save(libraryFeature);

    return {
      message: 'Library Feature created successfully',
      data,
    };
  }

  async findAll(adminId: string) {
    const data = await this.libraryFeatureRepository.find({
      where: {
        library: {
          admin: { id: adminId }
        }
      },
      relations: ['library']
    });
    return {
      message: 'Libraries retrieved successfully',
      data,
    };
  }

  async findByLibraryId(id: string, adminId: string) {
    const library = await this.libraryRepository.findOne({
      where: { id, admin: { id: adminId } }
    });

    if (!library) {
      return {
        message: 'Library not found or you do not have permission',
      };
    }

    const data = await this.libraryFeatureRepository.find({
      where: { library: { id } },
    });

    return {
      message: 'Library retrieved successfully',
      data,
    };
  }

  async update(id: string, updateLibraryFeatureDto: UpdateLibraryFeatureDto, adminId: string) {
    const libraryFeature = await this.libraryFeatureRepository.findOne({
      where: {
        id,
        library: {
          admin: { id: adminId }
        }
      },
    });

    if (!libraryFeature) {
      return {
        message: 'Library feature not found or you do not have permission',
      };
    }

    const updatedLibraryFeature = await this.libraryFeatureRepository.update(id, updateLibraryFeatureDto);

    return {
      message: 'Library updated successfully',
      data: updatedLibraryFeature,
    };
  }

  async remove(id: string, adminId: string) {
    const data = await this.libraryFeatureRepository.findOne({
      where: {
        id,
        library: {
          admin: { id: adminId }
        }
      },
    });

    if (!data) {
      throw new BadRequestException('Library feature not found or you do not have permission');
    }

    await this.libraryFeatureRepository.delete(id);

    return {
      message: 'Library removed successfully',
    };

  }

  
}
