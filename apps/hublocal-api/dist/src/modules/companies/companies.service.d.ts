import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesService {
    private companiesRepository;
    constructor(companiesRepository: Repository<Company>);
    create(createCompanyDto: CreateCompanyDto, userId: string): Promise<Company>;
    findAll(userId: string): Promise<Company[]>;
    findOne(id: string, userId: string): Promise<Company>;
    update(id: string, updateCompanyDto: UpdateCompanyDto, userId: string): Promise<Company>;
    remove(id: string, userId: string): Promise<void>;
}
