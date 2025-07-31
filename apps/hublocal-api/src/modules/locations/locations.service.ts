import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  private async verifyCompanyOwnership(companyId: string, userId: string) {
    const company = await this.companiesRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID "${companyId}" not found`);
    }
    if (company.userId !== userId) {
      throw new ForbiddenException('You do not own this company');
    }
    return company;
  }

  async create(
    createLocationDto: CreateLocationDto,
    companyId: string,
    userId: string,
  ): Promise<Location> {
    await this.verifyCompanyOwnership(companyId, userId);
    const location = this.locationsRepository.create({
      ...createLocationDto,
      companyId,
    });
    return this.locationsRepository.save(location);
  }

  async findAll(companyId: string, userId: string): Promise<Location[]> {
    await this.verifyCompanyOwnership(companyId, userId);
    return this.locationsRepository.find({ where: { companyId } });
  }

  async update(
    locationId: string,
    updateLocationDto: UpdateLocationDto,
    companyId: string,
    userId: string,
  ): Promise<Location> {
    await this.verifyCompanyOwnership(companyId, userId);
    const location = await this.locationsRepository.findOne({
      where: { id: locationId, companyId },
    });

    if (!location) {
      throw new NotFoundException(`Location with ID "${locationId}" not found`);
    }

    Object.assign(location, updateLocationDto);
    return this.locationsRepository.save(location);
  }

  async remove(
    locationId: string,
    companyId: string,
    userId: string,
  ): Promise<void> {
    await this.verifyCompanyOwnership(companyId, userId);
    const result = await this.locationsRepository.delete({
      id: locationId,
      companyId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID "${locationId}" not found`);
    }
  }
}
