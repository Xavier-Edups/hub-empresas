import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, ParseUUIDPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('companies/:companyId/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() createLocationDto: CreateLocationDto,
    @Request() req,
  ) {
    return this.locationsService.create(createLocationDto, companyId, req.user.id);
  }

  @Get()
  findAll(@Param('companyId', ParseUUIDPipe) companyId: string, @Request() req) {
    return this.locationsService.findAll(companyId, req.user.id);
  }

  @Put(':locationId')
  update(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('locationId', ParseUUIDPipe) locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @Request() req,
  ) {
    return this.locationsService.update(locationId, updateLocationDto, companyId, req.user.id);
  }

  @Delete(':locationId')
  remove(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('locationId', ParseUUIDPipe) locationId: string,
    @Request() req,
  ) {
    return this.locationsService.remove(locationId, companyId, req.user.id);
  }
}
