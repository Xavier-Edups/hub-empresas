import { Company } from '../../companies/entities/company.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    companies: Company;
    createdAt: Date;
    updatedAt: Date;
}
