import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<Omit<import("../users/entities/user.entity").User, "password">>;
}
