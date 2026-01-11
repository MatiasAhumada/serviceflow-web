import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentOrders1766877081441 implements MigrationInterface {
  name = 'AddPaymentOrders1766877081441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."payment_orders_status_enum" AS ENUM('pending', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "company_id" uuid NOT NULL, "sale_id" uuid NOT NULL, "cashier_id" uuid, "cash_register_id" uuid, "order_number" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "status" "public"."payment_orders_status_enum" NOT NULL DEFAULT 'pending', "completed_at" TIMESTAMP, CONSTRAINT "UQ_dd7c4dc7955699d902638207e34" UNIQUE ("order_number"), CONSTRAINT "PK_158dd178010c39759305293a149" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_orders" ADD CONSTRAINT "FK_74cc26cd86e9ff39a979e96d82b" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_orders" ADD CONSTRAINT "FK_73f294829b5d465507772595a62" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_orders" ADD CONSTRAINT "FK_9f99b85f691b4f63b4661b57546" FOREIGN KEY ("cashier_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_orders" ADD CONSTRAINT "FK_43671841ded49278906bb272108" FOREIGN KEY ("cash_register_id") REFERENCES "cash_registers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_orders" DROP CONSTRAINT "FK_43671841ded49278906bb272108"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_orders" DROP CONSTRAINT "FK_9f99b85f691b4f63b4661b57546"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_orders" DROP CONSTRAINT "FK_73f294829b5d465507772595a62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_orders" DROP CONSTRAINT "FK_74cc26cd86e9ff39a979e96d82b"`,
    );
    await queryRunner.query(`DROP TABLE "payment_orders"`);
    await queryRunner.query(`DROP TYPE "public"."payment_orders_status_enum"`);
  }
}
