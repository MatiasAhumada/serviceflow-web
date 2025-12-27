import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReceipts1766875995459 implements MigrationInterface {
    name = 'AddReceipts1766875995459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "receipts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "company_id" uuid NOT NULL, "sale_id" uuid NOT NULL, "customer_id" uuid NOT NULL, "seller_id" uuid NOT NULL, "technician_id" uuid, "receipt_number" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "subtotal" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(10,2) NOT NULL, "payment_method" character varying NOT NULL, "pdf_path" character varying, CONSTRAINT "UQ_f57eed557248913be5ee2316dba" UNIQUE ("receipt_number"), CONSTRAINT "PK_5e8182d7c29e023da6e1ff33bfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "receipts" ADD CONSTRAINT "FK_a560b337c02d397720dad8f8193" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receipts" ADD CONSTRAINT "FK_956677029d89d213db625a5739b" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receipts" ADD CONSTRAINT "FK_7b3c9ac513f95ec0e9efcf6670f" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receipts" ADD CONSTRAINT "FK_94f2724553be80f6dd9fb0b7cd2" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receipts" ADD CONSTRAINT "FK_7612d651ad834d22cc54e7eaa06" FOREIGN KEY ("technician_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipts" DROP CONSTRAINT "FK_7612d651ad834d22cc54e7eaa06"`);
        await queryRunner.query(`ALTER TABLE "receipts" DROP CONSTRAINT "FK_94f2724553be80f6dd9fb0b7cd2"`);
        await queryRunner.query(`ALTER TABLE "receipts" DROP CONSTRAINT "FK_7b3c9ac513f95ec0e9efcf6670f"`);
        await queryRunner.query(`ALTER TABLE "receipts" DROP CONSTRAINT "FK_956677029d89d213db625a5739b"`);
        await queryRunner.query(`ALTER TABLE "receipts" DROP CONSTRAINT "FK_a560b337c02d397720dad8f8193"`);
        await queryRunner.query(`DROP TABLE "receipts"`);
    }

}
