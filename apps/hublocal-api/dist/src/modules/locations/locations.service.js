"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("./entities/location.entity");
const company_entity_1 = require("../companies/entities/company.entity");
let LocationsService = class LocationsService {
    locationsRepository;
    companiesRepository;
    constructor(locationsRepository, companiesRepository) {
        this.locationsRepository = locationsRepository;
        this.companiesRepository = companiesRepository;
    }
    async verifyCompanyOwnership(companyId, userId) {
        const company = await this.companiesRepository.findOne({
            where: { id: companyId },
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID "${companyId}" not found`);
        }
        if (company.userId !== userId) {
            throw new common_1.ForbiddenException('You do not own this company');
        }
        return company;
    }
    async create(createLocationDto, companyId, userId) {
        await this.verifyCompanyOwnership(companyId, userId);
        const location = this.locationsRepository.create({
            ...createLocationDto,
            companyId,
        });
        return this.locationsRepository.save(location);
    }
    async findAll(companyId, userId) {
        await this.verifyCompanyOwnership(companyId, userId);
        return this.locationsRepository.find({ where: { companyId } });
    }
    async update(locationId, updateLocationDto, companyId, userId) {
        await this.verifyCompanyOwnership(companyId, userId);
        const location = await this.locationsRepository.findOne({
            where: { id: locationId, companyId },
        });
        if (!location) {
            throw new common_1.NotFoundException(`Location with ID "${locationId}" not found`);
        }
        Object.assign(location, updateLocationDto);
        return this.locationsRepository.save(location);
    }
    async remove(locationId, companyId, userId) {
        await this.verifyCompanyOwnership(companyId, userId);
        const result = await this.locationsRepository.delete({
            id: locationId,
            companyId,
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Location with ID "${locationId}" not found`);
        }
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LocationsService);
//# sourceMappingURL=locations.service.js.map