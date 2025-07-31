import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto, req: any): Promise<import("./entities/company.entity").Company>;
    findAll(req: any): Promise<import("./entities/company.entity").Company[]>;
    findOne(id: string, req: any): Promise<import("./entities/company.entity").Company>;
    update(id: string, updateCompanyDto: UpdateCompanyDto, req: any): Promise<import("./entities/company.entity").Company>;
    remove(id: string, req: any): Promise<void>;
}
