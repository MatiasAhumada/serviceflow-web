import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDataFiscalCustomer1766931221451 implements MigrationInterface {
    name = 'AddDataFiscalCustomer1766931221451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "tax_condition" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "document_type" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "document_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "document_number"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "document_type"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "tax_condition"`);
    }

}
