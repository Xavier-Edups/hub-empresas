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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../../companies/entities/company.entity");
let Location = class Location {
    id;
    name;
    cep;
    street;
    number;
    neighborhood;
    city;
    state;
    companyId;
    company;
    createdAt;
    updatedAt;
};
exports.Location = Location;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Location.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.locations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'companyId' }),
    __metadata("design:type", company_entity_1.Company)
], Location.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Location.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Location.prototype, "updatedAt", void 0);
exports.Location = Location = __decorate([
    (0, typeorm_1.Entity)('locations')
], Location);
//# sourceMappingURL=location.entity.js.map