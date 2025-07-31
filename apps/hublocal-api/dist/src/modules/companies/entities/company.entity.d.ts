import { User } from '../../users/entities/user.entity';
import { Location } from '../../locations/entities/location.entity';
export declare class Company {
    id: string;
    name: string;
    website: string;
    cnpj: string;
    userId: string;
    user: User;
    locations: Location;
    createdAt: Date;
    updatedAt: Date;
}
