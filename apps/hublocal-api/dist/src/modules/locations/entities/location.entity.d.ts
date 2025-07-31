import { Company } from '../../companies/entities/company.entity';
export declare class Location {
    id: string;
    name: string;
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    companyId: string;
    company: Company;
    createdAt: Date;
    updatedAt: Date;
}
