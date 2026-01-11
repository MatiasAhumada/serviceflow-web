import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePdfPathFromReceipts1768144303401 implements MigrationInterface {
    name = 'RemovePdfPathFromReceipts1768144303401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipts" DROP COLUMN "pdf_path"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipts" ADD "pdf_path" character varying`);
    }

}
