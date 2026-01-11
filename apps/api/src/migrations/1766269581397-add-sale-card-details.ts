import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSaleCardDetails1766269581397 implements MigrationInterface {
  name = 'AddSaleCardDetails1766269581397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sale_card_details_card_brand_enum" AS ENUM('visa', 'mastercard', 'american_express', 'cabal', 'naranja', 'nativa', 'maestro')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sale_card_details_card_type_enum" AS ENUM('credit', 'debit', 'prepaid')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sale_card_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sale_id" uuid NOT NULL, "card_brand" "public"."sale_card_details_card_brand_enum" NOT NULL, "card_type" "public"."sale_card_details_card_type_enum" NOT NULL, "last_four_digits" character varying(4) NOT NULL, "installments" integer, CONSTRAINT "PK_026ba3cbd4f1d821f8a8ef41b34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."payments_method_enum" RENAME TO "payments_method_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_method_enum" AS ENUM('cash', 'debit_card', 'credit_card', 'transfer', 'qr', 'mercadopago')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "method" TYPE "public"."payments_method_enum" USING "method"::"text"::"public"."payments_method_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."payments_method_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sales_payment_method_enum" RENAME TO "sales_payment_method_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_payment_method_enum" AS ENUM('cash', 'debit_card', 'credit_card', 'transfer', 'qr', 'mercadopago')`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "payment_method" TYPE "public"."sales_payment_method_enum" USING "payment_method"::"text"::"public"."sales_payment_method_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."sales_payment_method_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale_card_details" ADD CONSTRAINT "FK_2cce00f84df7b93fdbaf050e317" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale_card_details" DROP CONSTRAINT "FK_2cce00f84df7b93fdbaf050e317"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_payment_method_enum_old" AS ENUM('credit_card', 'debit_card', 'bank_transfer', 'cash')`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "payment_method" TYPE "public"."sales_payment_method_enum_old" USING "payment_method"::"text"::"public"."sales_payment_method_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."sales_payment_method_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sales_payment_method_enum_old" RENAME TO "sales_payment_method_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_method_enum_old" AS ENUM('credit_card', 'debit_card', 'bank_transfer', 'cash')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "method" TYPE "public"."payments_method_enum_old" USING "method"::"text"::"public"."payments_method_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."payments_method_enum_old" RENAME TO "payments_method_enum"`,
    );
    await queryRunner.query(`DROP TABLE "sale_card_details"`);
    await queryRunner.query(
      `DROP TYPE "public"."sale_card_details_card_type_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."sale_card_details_card_brand_enum"`,
    );
  }
}
