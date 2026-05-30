import { Injectable } from '@nestjs/common';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sheet } from './entities/sheet.entity';
import { Repository } from 'typeorm';
import { Library } from 'src/librarys/entities/library.entity';


@Injectable()
export class SheetsService {
  constructor(
    @InjectRepository(Sheet)
    private sheetRepository: Repository<Sheet>,
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
  ) { }
  async create(createSheetDto: CreateSheetDto, adminId: string) {
    const { name, sheetCount, libraryId } = createSheetDto;

    const library = await this.libraryRepository.findOne({
      where: { id: libraryId, admin: { id: adminId } }
    });

    if (!library) {
      return {
        message: 'Library not found or you do not have permission',
      };
    }

    const sheets: Sheet[] = [];

    for (let i = 1; i <= sheetCount; i++) {
      const sheetNumber = `${name}${i}`;

      const sheet = this.sheetRepository.create({
        sheetNumber,
        library: {
          id: libraryId,
        },
      });

      sheets.push(sheet);
    }

    const data = await this.sheetRepository.save(sheets);

    return {
      message: 'Sheets created successfully',
      totalSheets: data.length,

      sheets: data.map((sheet, index) => ({
        sheetId: sheet.id,
        sheetName: name,
        sheetNumber: index + 1,
        fullSheetNumber: sheet.sheetNumber,
        isAvailable: sheet.isAvailable,
      })),
    };
  }


  async findAll(adminId: string) {
    const sheets = await this.sheetRepository.find({
      where: {
        library: {
          admin: { id: adminId }
        }
      },
      relations: ['library']
    });

    return {
      message: 'Sheets found successfully',
      sheets,
    }
  }

  async findOne(id: string, adminId: string) {
    const sheet = await this.sheetRepository.findOne({
      where: {
        id,
        library: {
          admin: { id: adminId }
        }
      },
      relations: ['library']
    });

    if (!sheet) {
      return {
        message: 'Sheet not found or you do not have permission',
      };
    }

    return {
      message: 'Sheet found successfully',
      sheet,
    }
  }

  async update(id: string, updateSheetDto: UpdateSheetDto, adminId: string) {
    const sheet = await this.sheetRepository.findOne({
      where: {
        id,
        library: {
          admin: { id: adminId }
        }
      }
    });

    if (!sheet) {
      return {
        message: 'Sheet not found or you do not have permission',
      };
    }

    return `This action updates a #${id} sheet`;
  }

   async remove(id: string, adminId: string) {
    const sheet = await this.sheetRepository.findOne({
      where: {
        id,
        library: {
          admin: { id: adminId }
        }
      }
    });

    if (!sheet) {
      return {
        message: 'Sheet not found or you do not have permission',
      };
    }

    const result = await this.sheetRepository.delete(id);

    return {
      message: 'Sheet deleted successfully',
      result,
    };
  }
}
