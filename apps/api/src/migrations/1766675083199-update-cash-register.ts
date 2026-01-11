import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCashRegister1766675083199 implements MigrationInterface {
  name = 'UpdateCashRegister1766675083199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cash_movements" ADD "sale_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD "discount" numeric(10,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "discount"`);
    await queryRunner.query(
      `ALTER TABLE "cash_movements" DROP COLUMN "sale_id"`,
    );
  }
}
