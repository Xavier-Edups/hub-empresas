import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialSetup1753930722078 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
