import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LibraryFeatureService } from './library-feature.service';
import { CreateLibraryFeatureDto } from './dto/create-library-feature.dto';
import { UpdateLibraryFeatureDto } from './dto/update-library-feature.dto';

@Controller('library-feature')
export class LibraryFeatureController {
  constructor(private readonly libraryFeatureService: LibraryFeatureService) {}

  @Post()
  create(@Req() req: any, @Body() createLibraryFeatureDto: CreateLibraryFeatureDto) {
    const adminId = req.admins.id;
    return this.libraryFeatureService.create(createLibraryFeatureDto, adminId);
  }

  @Get()
  findAll(@Req() req: any) {
    const adminId = req.admins.id;
    return this.libraryFeatureService.findAll(adminId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const adminId = req.admins.id;
    return this.libraryFeatureService.findByLibraryId(id, adminId);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateLibraryFeatureDto: UpdateLibraryFeatureDto) {
    const adminId = req.admins.id;
    return this.libraryFeatureService.update(id, updateLibraryFeatureDto, adminId);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const adminId = req.admins.id;
    return this.libraryFeatureService.remove(id, adminId);
  }
}
