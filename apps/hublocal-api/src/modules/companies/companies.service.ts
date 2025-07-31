import { Injectable, ForbiddenException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, userId: string): Promise<Company> {
    console.log("ESTRUTURA COMPANIES: ", {...createCompanyDto, userId})
    const company = this.companiesRepository.create({
      ...createCompanyDto,
      userId
    });

    try {
      return await this.companiesRepository.save(company);
    } catch (error) {
    // PRECISAMOS VER A SAÍDA COMPLETA DESTE LOG
      console.error('ERRO DETALHADO DO BANCO DE DADOS:', error);

      throw new InternalServerErrorException('Falha ao criar a empresa no banco de dados.');
    }
  }

  findAll(userId: string): Promise<Company[]> {
    return this.companiesRepository.find({
      where: { userId },
      relations: ['locations'],
    });
  }

  async findOne(id: string, userId: string): Promise<Company> {
    const company = await this.companiesRepository.findOne({ where: { id, userId } });
    if (!company) {
      throw new NotFoundException(`Company with ID "\${id}" not found`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, userId: string): Promise<Company> {
    const company = await this.findOne(id, userId); // A verificação de propriedade já ocorre aqui
    Object.assign(company, updateCompanyDto);
    return this.companiesRepository.save(company);
  }

  async remove(id: string, userId: string): Promise<void> {
    const company = await this.findOne(id, userId); // A verificação de propriedade já ocorre aqui
    await this.companiesRepository.remove(company);
  }
}
