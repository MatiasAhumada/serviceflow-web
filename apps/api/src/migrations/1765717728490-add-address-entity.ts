import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressEntity1765717728490 implements MigrationInterface {
    name = 'AddAddressEntity1765717728490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "address" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "address" TO "address_id"`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "street" character varying NOT NULL, "city" character varying, "state" character varying, "state_code" character varying, "country" character varying, "country_code" character varying, "postal_code" character varying, "notes" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_ad150e1e829fc0c9013267f3e4c" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_2441e5a7e71f5dc216fa2f96feb" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_ad150e1e829fc0c9013267f3e4c" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_2441e5a7e71f5dc216fa2f96feb" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_2441e5a7e71f5dc216fa2f96feb"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_ad150e1e829fc0c9013267f3e4c"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_2441e5a7e71f5dc216fa2f96feb"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "address_id" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_ad150e1e829fc0c9013267f3e4c"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "address_id" character varying`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "address_id" TO "address"`);
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "address_id" TO "address"`);
    }

}
