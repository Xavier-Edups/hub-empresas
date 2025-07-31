import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    create(companyId: string, createLocationDto: CreateLocationDto, req: any): Promise<import("./entities/location.entity").Location>;
    findAll(companyId: string, req: any): Promise<import("./entities/location.entity").Location[]>;
    update(companyId: string, locationId: string, updateLocationDto: UpdateLocationDto, req: any): Promise<import("./entities/location.entity").Location>;
    remove(companyId: string, locationId: string, req: any): Promise<void>;
}
