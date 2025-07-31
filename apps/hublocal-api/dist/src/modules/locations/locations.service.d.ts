import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Company } from '../companies/entities/company.entity';
export declare class LocationsService {
    private locationsRepository;
    private companiesRepository;
    constructor(locationsRepository: Repository<Location>, companiesRepository: Repository<Company>);
    private verifyCompanyOwnership;
    create(createLocationDto: CreateLocationDto, companyId: string, userId: string): Promise<Location>;
    findAll(companyId: string, userId: string): Promise<Location[]>;
    update(locationId: string, updateLocationDto: UpdateLocationDto, companyId: string, userId: string): Promise<Location>;
    remove(locationId: string, companyId: string, userId: string): Promise<void>;
}
