import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';

@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Post()
  create(@Req() req: any, @Body() createSheetDto: CreateSheetDto) {
    const adminId = req.admins.id;
    return this.sheetsService.create(createSheetDto, adminId);
  }

  @Get()
  findAll(@Req() req: any) {
    const adminId = req.admins.id;
    return this.sheetsService.findAll(adminId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const adminId = req.admins.id;
    return this.sheetsService.findOne(id, adminId);
  } 

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateSheetDto: UpdateSheetDto) {
    const adminId = req.admins.id;
    return this.sheetsService.update(id, updateSheetDto, adminId);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const adminId = req.admins.id;
    return this.sheetsService.remove(id, adminId);
  }
}
